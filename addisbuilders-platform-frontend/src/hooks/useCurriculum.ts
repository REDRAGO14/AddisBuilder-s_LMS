import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Course, CourseModule, Lesson, ContentType } from '../types';
import { curriculumService, CreateLessonPayload } from '../services/curriculum.service';
import { coursesService } from '../services/courses.service';
import { apiErrorMessage } from '../utils';

export interface LessonDraft {
  title: string;
  type: ContentType;
  body?: string;
  contentUrl?: string;
  durationMinutes?: number;
}

export interface CurriculumState {
  course: Course | null;
  modules: CourseModule[];
  loading: boolean;
  error: string | null;
  /** id of the entity with an in-flight mutation (for spinners) */
  pendingId: string | null;
  /** flat Spring validation errors keyed by field name (`errors: Record<string,string>`) */
  fieldErrors: Record<string, string>;
  collapsedModuleIds: string[];
  editingModuleId: string | null;
  selectedLessonId: string | null;
}

/**
 * `useCurriculum` — the curriculum builder state machine.
 *
 * Encapsulates fetching the course + its module/lesson tree and every
 * CRUD/reorder mutation against the backend (§6.6). Reorders are applied
 * optimistically and rolled back on API failure; every mutation returns a
 * boolean so the view layer can raise toasts.
 */
export function useCurriculum(courseId?: string) {
  const [state, setState] = useState<CurriculumState>({
    course: null,
    modules: [],
    loading: true,
    error: null,
    pendingId: null,
    fieldErrors: {},
    collapsedModuleIds: [],
    editingModuleId: null,
    selectedLessonId: null,
  });

  const setStatePartial = useCallback(
    (patch: Partial<CurriculumState>) => setState((prev) => ({ ...prev, ...patch })),
    []
  );

  // Keeps the selected lesson fresh across state updates.
  const modulesRef = useRef<CourseModule[]>([]);
  modulesRef.current = state.modules;

  const selectedLesson: Lesson | null = useMemo(() => {
    if (!state.selectedLessonId) return null;
    for (const m of state.modules) {
      const found = m.lessons.find((l) => l.id === state.selectedLessonId);
      if (found) return found;
    }
    return null;
  }, [state.modules, state.selectedLessonId]);

  /* ----------------------------- fetching ----------------------------- */

  const load = useCallback(async () => {
    if (!courseId) return;
    setStatePartial({ loading: true, error: null });
    // Resilient fetch: course metadata failure must not blank the tree.
    const [modules, course] = await Promise.all([
      curriculumService.getCurriculum(courseId).catch((err) => {
        setStatePartial({ error: apiErrorMessage(err, 'Failed to load the curriculum') });
        return [] as CourseModule[];
      }),
      coursesService.getCourseById(courseId).catch(() => null),
    ]);
    setStatePartial({
      modules: sortModules(modules),
      course,
      loading: false,
    });
  }, [courseId, setStatePartial]);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  /* --------------------------- module actions -------------------------- */

  const addModule = useCallback(
    async (title: string): Promise<boolean> => {
      if (!courseId || !title.trim()) return false;
      setStatePartial({ pendingId: 'new-module' });
      try {
        const created = await curriculumService.createModule(courseId, title.trim(), modulesRef.current.length + 1);
        setState((prev) => ({
          ...prev,
          modules: [...prev.modules, { ...created, lessons: created.lessons ?? [] }],
          pendingId: null,
          fieldErrors: {},
          collapsedModuleIds: prev.collapsedModuleIds.filter((id) => id !== created.id),
        }));
        return true;
      } catch (err) {
        setStatePartial({ pendingId: null, fieldErrors: extractFieldErrors(err) });
        toastError(err, 'Failed to create module');
        return false;
      }
    },
    [courseId, setStatePartial]
  );

  const renameModule = useCallback(
    async (moduleId: string, title: string): Promise<boolean> => {
      const snapshot = state.modules;
      if (!title.trim()) return false;
      // Optimistic inline rename
      setState((prev) => ({
        ...prev,
        modules: prev.modules.map((m) => (m.id === moduleId ? { ...m, title: title.trim() } : m)),
      }));
      try {
        await curriculumService.updateModule(moduleId, { title: title.trim() });
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot, fieldErrors: extractFieldErrors(err) });
        toastError(err, 'Failed to rename module');
        return false;
      }
    },
    [state.modules, setStatePartial]
  );

  const removeModule = useCallback(
    async (moduleId: string): Promise<boolean> => {
      const snapshot = state.modules;
      const removed = snapshot.find((m) => m.id === moduleId);
      // Optimistic removal (cascades lessons server-side)
      setState((prev) => ({
        ...prev,
        modules: prev.modules.filter((m) => m.id !== moduleId),
        selectedLessonId: removed?.lessons.some((l) => l.id === prev.selectedLessonId)
          ? null
          : prev.selectedLessonId,
      }));
      try {
        await curriculumService.deleteModule(moduleId);
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot });
        toastError(err, 'Failed to delete module');
        return false;
      }
    },
    [state.modules, setStatePartial]
  );

  /** Moves a module one position up (-1) or down (+1) with optimistic rollback. */
  const moveModule = useCallback(
    async (moduleId: string, direction: -1 | 1): Promise<boolean> => {
      if (!courseId) return false;
      const snapshot = state.modules;
      const index = snapshot.findIndex((m) => m.id === moduleId);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= snapshot.length) return false;

      const next = [...snapshot];
      [next[index], next[target]] = [next[target], next[index]];
      setStatePartial({ modules: next });

      try {
        await curriculumService.reorderModules(courseId, next.map((m) => m.id));
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot });
        toastError(err, 'Failed to reorder modules');
        return false;
      }
    },
    [courseId, state.modules, setStatePartial]
  );

  /* --------------------------- lesson actions -------------------------- */

  const addLesson = useCallback(
    async (moduleId: string, draft: LessonDraft): Promise<Lesson | null> => {
      const parent = modulesRef.current.find((m) => m.id === moduleId);
      const payload: CreateLessonPayload = {
        title: draft.title.trim() || 'Untitled Lesson',
        type: draft.type,
        body: draft.body,
        contentUrl: draft.contentUrl,
        durationMinutes: draft.durationMinutes,
        lessonOrder: parent ? parent.lessons.length + 1 : 1,
      };
      setStatePartial({ pendingId: `new-lesson-${moduleId}` });
      try {
        const created = await curriculumService.createLesson(moduleId, payload);
        setState((prev) => ({
          ...prev,
          modules: prev.modules.map((m) =>
            m.id === moduleId ? { ...m, lessons: [...m.lessons, created] } : m
          ),
          pendingId: null,
          fieldErrors: {},
          selectedLessonId: created.id,
        }));
        return created;
      } catch (err) {
        setStatePartial({ pendingId: null, fieldErrors: extractFieldErrors(err) });
        toastError(err, 'Failed to create lesson');
        return null;
      }
    },
    [setStatePartial]
  );

  const saveLesson = useCallback(
    async (lessonId: string, patch: Partial<LessonDraft>): Promise<boolean> => {
      const snapshot = state.modules;
      // Optimistic update of the edited fields
      setState((prev) => ({
        ...prev,
        modules: prev.modules.map((m) => ({
          ...m,
          lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...patch } : l)),
        })),
      }));
      try {
        const saved = await curriculumService.updateLesson(lessonId, patch);
        // Reconcile with server truth
        setState((prev) => ({
          ...prev,
          fieldErrors: {},
          modules: prev.modules.map((m) => ({
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, ...saved } : l)),
          })),
        }));
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot, fieldErrors: extractFieldErrors(err) });
        toastError(err, 'Failed to save lesson');
        return false;
      }
    },
    [state.modules, setStatePartial]
  );

  const removeLesson = useCallback(
    async (lessonId: string): Promise<boolean> => {
      const snapshot = state.modules;
      setState((prev) => ({
        ...prev,
        modules: prev.modules.map((m) => ({
          ...m,
          lessons: m.lessons.filter((l) => l.id !== lessonId),
        })),
        selectedLessonId: prev.selectedLessonId === lessonId ? null : prev.selectedLessonId,
      }));
      try {
        await curriculumService.deleteLesson(lessonId);
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot });
        toastError(err, 'Failed to delete lesson');
        return false;
      }
    },
    [state.modules, setStatePartial]
  );

  /** Moves a lesson within its module (up: -1, down: +1) with optimistic rollback. */
  const moveLesson = useCallback(
    async (moduleId: string, lessonId: string, direction: -1 | 1): Promise<boolean> => {
      const snapshot = state.modules;
      const module = snapshot.find((m) => m.id === moduleId);
      if (!module) return false;
      const index = module.lessons.findIndex((l) => l.id === lessonId);
      const target = index + direction;
      if (index === -1 || target < 0 || target >= module.lessons.length) return false;

      const reordered = [...module.lessons];
      [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
      setStatePartial({
        modules: snapshot.map((m) =>
          m.id === moduleId ? { ...m, lessons: reordered } : m
        ),
      });

      try {
        await curriculumService.reorderLessons(moduleId, reordered.map((l) => l.id));
        return true;
      } catch (err) {
        setStatePartial({ modules: snapshot });
        toastError(err, 'Failed to reorder lessons');
        return false;
      }
    },
    [state.modules, setStatePartial]
  );

  /* ------------------------------ UI state ----------------------------- */

  const toggleModule = useCallback((moduleId: string) => {
    setState((prev) => ({
      ...prev,
      collapsedModuleIds: prev.collapsedModuleIds.includes(moduleId)
        ? prev.collapsedModuleIds.filter((id) => id !== moduleId)
        : [...prev.collapsedModuleIds, moduleId],
    }));
  }, []);

  const setEditingModule = useCallback(
    (moduleId: string | null) => setStatePartial({ editingModuleId: moduleId }),
    [setStatePartial]
  );

  const selectLesson = useCallback(
    (lessonId: string | null) =>
      setStatePartial({ selectedLessonId: lessonId, fieldErrors: {} }),
    [setStatePartial]
  );

  return {
    ...state,
    selectedLesson,
    load,
    addModule,
    renameModule,
    removeModule,
    moveModule,
    addLesson,
    saveLesson,
    removeLesson,
    moveLesson,
    toggleModule,
    setEditingModule,
    selectLesson,
  };
}

/* ------------------------------ helpers ------------------------------ */

function sortModules(modules: CourseModule[]): CourseModule[] {
  return [...modules]
    .sort((a, b) => (a.moduleOrder ?? a.order ?? 0) - (b.moduleOrder ?? b.order ?? 0))
    .map((m) => ({
      ...m,
      lessons: [...(m.lessons ?? [])].sort(
        (a, b) => (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0)
      ),
    }));
}

/**
 * Parses Spring Boot's flat validation error structure
 * `{ errors: Record<string, string> }` (spec §3.3) so the editor can render
 * messages inline next to the offending form fields.
 */
function extractFieldErrors(err: unknown): Record<string, string> {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { errors?: Record<string, string> } | undefined;
    if (data?.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
      return data.errors;
    }
  }
  return {};
}

function toastError(err: unknown, fallback: string) {
  // Imported lazily to keep the hook framework-agnostic at import time.
  import('sonner').then(({ toast }) => toast.error(apiErrorMessage(err, fallback)));
}

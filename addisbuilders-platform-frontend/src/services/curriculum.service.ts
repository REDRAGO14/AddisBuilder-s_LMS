import { apiClient, USE_MOCK } from './api';
import { CourseModule, Lesson, ContentType } from '../types';

/**
 * Curriculum service — the module/lesson (curriculum) domain.
 *
 * Deliberately separate from `courses.service.ts` (course metadata) and
 * `coursesService.addMaterial` (flat file resources under
 * `/courses/{courseId}/materials`). The curriculum is the hierarchical
 * learning path: Modules → Lessons.
 *
 * Backend contract (BACKEND_API_REFERENCE.md §6.6):
 *   GET    /api/courses/{courseId}/modules            → full curriculum with nested lessons
 *   POST   /api/courses/{courseId}/modules            → create module { title, moduleOrder }
 *   PATCH  /api/modules/{moduleId}                    → update module { title?, moduleOrder? }
 *   DELETE /api/modules/{moduleId}                    → delete module (cascades lessons)
 *   PUT    /api/courses/{courseId}/modules/reorder    → { ids: number[] } (complete list, index = new order)
 *   POST   /api/modules/{moduleId}/lessons            → create lesson
 *   PATCH  /api/lessons/{lessonId}                    → update lesson (all optional)
 *   DELETE /api/lessons/{lessonId}                    → delete lesson
 *   PUT    /api/modules/{moduleId}/lessons/reorder    → { ids: number[] } (complete list, index = new order)
 */

export interface CreateLessonPayload {
  title: string;
  type: ContentType;
  body?: string;
  contentUrl?: string;
  durationMinutes?: number;
  lessonOrder?: number;
}

export interface UpdateLessonPayload {
  title?: string;
  type?: ContentType;
  body?: string;
  contentUrl?: string;
  durationMinutes?: number;
  lessonOrder?: number;
}

/* ------------------------------------------------------------------ */
/* Mock-mode persistence (mirrors mockStorage's `course_modules` key)  */
/* ------------------------------------------------------------------ */

const MOCK_MODULES_KEY = 'addis_mock_course_modules';
const mockDelay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

function readMockModules(): CourseModule[] {
  try {
    const raw = localStorage.getItem(MOCK_MODULES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore parse errors, fall through */
  }
  // Delegate to mockStorage for its defaults (it reads the same key with
  // seeded fallback data), then cache so mutations persist.
  return [];
}

function writeMockModules(modules: CourseModule[]): void {
  try {
    localStorage.setItem(MOCK_MODULES_KEY, JSON.stringify(modules));
  } catch {
    /* ignore quota errors */
  }
}

/**
 * Backend IDs are JSON numbers. UI uses string ids — normalize when sending
 * reorder payloads `{ ids: number[] }`.
 */
const toNumericIds = (ids: string[]): number[] =>
  ids.map((id) => Number(id)).filter((n) => Number.isFinite(n) && n > 0);

/**
 * Normalizes the backend ModuleResponses/LessonResponse payloads
 * ({ moduleOrder, lessons[] } with numeric ids) into the frontend
 * CourseModule/Lesson shape ({ order, lessons[] } with string ids) so the
 * curriculum tree and builder render identically in mock and live mode.
 */
function normalizeModule(
  raw: CourseModule & { moduleOrder?: number; lessons?: unknown[] },
  index: number
): CourseModule {
  const lessons = (raw.lessons ?? []) as (Lesson & { lessonOrder?: number })[];
  return {
    ...raw,
    id: String(raw.id),
    courseId: String(raw.courseId ?? ''),
    order: raw.moduleOrder ?? raw.order ?? index + 1,
    lessons: lessons.map((lesson, lessonIdx) => ({
      ...lesson,
      id: String(lesson.id),
      moduleId: String(lesson.moduleId ?? raw.id),
      lessonOrder: lesson.lessonOrder ?? lessonIdx + 1,
    })),
  };
}

export const curriculumService = {
  /** GET /api/courses/{courseId}/modules — full curriculum with nested lessons. */
  async getCurriculum(courseId: string): Promise<CourseModule[]> {
    if (USE_MOCK) {
      await mockDelay();
      const cached = readMockModules().filter((m) => m.courseId === courseId);
      if (cached.length > 0) return cached;
      // Seed defaults via mockStorage so the builder works on a fresh course.
      const { mockStorage } = await import('./mockStorage');
      const seeded = await mockStorage.getCourseModules(courseId);
      const all = readMockModules();
      writeMockModules([...all, ...seeded]);
      return seeded;
    }
    const response = await apiClient.get<CourseModule[]>(`/courses/${courseId}/modules`);
    return response.data.map(normalizeModule);
  },

  /** POST /api/courses/{courseId}/modules — creates a module (201). */
  async createModule(courseId: string, title: string, moduleOrder?: number): Promise<CourseModule> {
    if (USE_MOCK) {
      await mockDelay();
      const all = readMockModules();
      const courseMods = all.filter((m) => m.courseId === courseId);
      const newMod: CourseModule = {
        id: `mod-${Date.now()}`,
        courseId,
        title,
        order: moduleOrder ?? courseMods.length + 1,
        lessons: [],
      };
      writeMockModules([...all, newMod]);
      return newMod;
    }
    const response = await apiClient.post<CourseModule>(`/courses/${courseId}/modules`, {
      title,
      moduleOrder,
    });
    return normalizeModule(response.data, 0);
  },

  /** PATCH /api/modules/{moduleId} — partial module update. */
  async updateModule(
    moduleId: string,
    data: { title?: string; moduleOrder?: number }
  ): Promise<CourseModule> {
    if (USE_MOCK) {
      await mockDelay(120);
      const all = readMockModules();
      const found = all.find((m) => m.id === moduleId);
      if (!found) throw new Error('Module not found');
      if (data.title != null) found.title = data.title;
      if (data.moduleOrder != null) found.order = data.moduleOrder;
      writeMockModules(all);
      return found;
    }
    const response = await apiClient.patch<CourseModule>(`/modules/${moduleId}`, data);
    return normalizeModule(response.data, 0);
  },

  /** DELETE /api/modules/{moduleId} — cascades lessons (204). */
  async deleteModule(moduleId: string): Promise<void> {
    if (USE_MOCK) {
      await mockDelay(150);
      writeMockModules(readMockModules().filter((m) => m.id !== moduleId));
      return;
    }
    await apiClient.delete(`/modules/${moduleId}`);
  },

  /**
   * PUT /api/courses/{courseId}/modules/reorder
   * The array becomes the new order starting at 1 and MUST contain every
   * module of the course exactly once.
   */
  async reorderModules(courseId: string, orderedIds: string[]): Promise<void> {
    if (USE_MOCK) {
      await mockDelay(150);
      const all = readMockModules();
      const order = new Map(orderedIds.map((id, idx) => [String(id), idx + 1]));
      all
        .filter((m) => m.courseId === courseId)
        .forEach((m) => {
          const next = order.get(String(m.id));
          if (next != null) m.order = next;
        });
      writeMockModules(all);
      return;
    }
    await apiClient.put(`/courses/${courseId}/modules/reorder`, { ids: toNumericIds(orderedIds) });
  },

  /** POST /api/modules/{moduleId}/lessons — creates a lesson (201). */
  async createLesson(moduleId: string, data: CreateLessonPayload): Promise<Lesson> {
    if (USE_MOCK) {
      await mockDelay();
      const all = readMockModules();
      const mod = all.find((m) => m.id === moduleId);
      const newLesson: Lesson = {
        id: `les-${Date.now()}`,
        moduleId,
        title: data.title,
        type: data.type,
        body: data.body,
        contentUrl: data.contentUrl,
        durationMinutes: data.durationMinutes,
        lessonOrder: data.lessonOrder ?? (mod ? mod.lessons.length + 1 : 1),
        isCompleted: false,
      };
      if (mod) {
        mod.lessons.push(newLesson);
        writeMockModules(all);
      }
      return newLesson;
    }
    const response = await apiClient.post<Lesson>(`/modules/${moduleId}/lessons`, data);
    return response.data;
  },

  /** PATCH /api/lessons/{lessonId} — partial lesson update. */
  async updateLesson(lessonId: string, data: UpdateLessonPayload): Promise<Lesson> {
    if (USE_MOCK) {
      await mockDelay(120);
      const all = readMockModules();
      for (const mod of all) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          Object.assign(lesson, data);
          writeMockModules(all);
          return lesson;
        }
      }
      throw new Error('Lesson not found');
    }
    const response = await apiClient.patch<Lesson>(`/lessons/${lessonId}`, data);
    return response.data;
  },

  /** DELETE /api/lessons/{lessonId} (204). */
  async deleteLesson(lessonId: string): Promise<void> {
    if (USE_MOCK) {
      await mockDelay(150);
      const all = readMockModules();
      for (const mod of all) {
        mod.lessons = mod.lessons.filter((l) => l.id !== lessonId);
      }
      writeMockModules(all);
      return;
    }
    await apiClient.delete(`/lessons/${lessonId}`);
  },

  /**
   * PUT /api/modules/{moduleId}/lessons/reorder
   * Same contract as module reorder, scoped to one module's lessons.
   */
  async reorderLessons(moduleId: string, orderedIds: string[]): Promise<void> {
    if (USE_MOCK) {
      await mockDelay(150);
      const all = readMockModules();
      const mod = all.find((m) => m.id === moduleId);
      if (mod) {
        const order = new Map(orderedIds.map((id, idx) => [String(id), idx + 1]));
        mod.lessons.forEach((l) => {
          const next = order.get(String(l.id));
          if (next != null) l.lessonOrder = next;
        });
        mod.lessons.sort((a, b) => (a.lessonOrder ?? 0) - (b.lessonOrder ?? 0));
        writeMockModules(all);
      }
      return;
    }
    await apiClient.put(`/modules/${moduleId}/lessons/reorder`, {
      ids: toNumericIds(orderedIds),
    });
  },
};

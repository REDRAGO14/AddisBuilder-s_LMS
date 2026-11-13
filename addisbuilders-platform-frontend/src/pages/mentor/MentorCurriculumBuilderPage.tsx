import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCurriculum, LessonDraft } from '../../hooks/useCurriculum';
import { CourseModule, Lesson, ContentType } from '../../types';
import { LESSON_TYPES } from '../../constants';
import { PageHeader } from '../../components/common/PageHeader';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Skeleton } from '../../components/ui/Skeleton';
import { LessonTypeBadge, normalizeLessonType } from '../../components/curriculum/LessonTypeBadge';
import { cn, apiErrorMessage } from '../../utils';
import { toast } from 'sonner';
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Pencil,
  Layers,
  Clock,
  BookOpen,
  FileStack,
  ExternalLink,
  Sparkles,
  FolderOpen,
  Check,
  X,
  ArrowRight,
  ListVideo,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Small view helpers                                                  */
/* ------------------------------------------------------------------ */

const moduleOrder = (m: CourseModule, fallback: number) => m.moduleOrder ?? m.order ?? fallback;
const lessonDuration = (l: Lesson) =>
  l.durationMinutes != null ? `${l.durationMinutes} min` : l.duration || '—';
const moduleMinutes = (m: CourseModule) =>
  m.lessons.reduce((sum, l) => sum + (l.durationMinutes ?? 0), 0);

/** Displays Spring validation errors next to the matching form field. */
const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="mt-1 text-xs font-medium text-red-600">{message}</p> : null;

/* ------------------------------------------------------------------ */
/* Inline module title editor (Enter saves · Esc cancels · blur saves) */
/* ------------------------------------------------------------------ */

interface InlineTitleEditorProps {
  initial: string;
  onCommit: (title: string) => void;
  onCancel: () => void;
}

const InlineTitleEditor: React.FC<InlineTitleEditorProps> = ({ initial, onCommit, onCancel }) => {
  const [value, setValue] = useState(initial);
  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') onCommit(value);
        if (e.key === 'Escape') onCancel();
      }}
      className="w-full rounded-lg border border-brand-400 bg-white dark:bg-neutral-900 px-2.5 py-1.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
    />
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const MentorCurriculumBuilderPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const curriculum = useCurriculum(courseId);
  const {
    course,
    modules,
    loading,
    error,
    pendingId,
    fieldErrors,
    collapsedModuleIds,
    editingModuleId,
    selectedLessonId,
    selectedLesson,
  } = curriculum;

  /* ------------------------- local UI state ------------------------- */

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [quickAddModuleId, setQuickAddModuleId] = useState<string | null>(null);
  const [quickAddTitle, setQuickAddTitle] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<
    { kind: 'module'; id: string; title: string; lessonCount: number } | { kind: 'lesson'; id: string; title: string } | null
  >(null);
  const [deleting, setDeleting] = useState(false);

  /* --------------------------- editor draft -------------------------- */

  const [draft, setDraft] = useState<LessonDraft>({
    title: '',
    type: 'TEXT',
    body: '',
    contentUrl: '',
    durationMinutes: 15,
  });

  // Re-seed the form only when a *different* lesson is selected — object
  // identity changes on optimistic updates must not wipe in-progress edits.
  useEffect(() => {
    if (!selectedLesson) return;
    setDraft({
      title: selectedLesson.title,
      type: normalizeLessonType(selectedLesson.type) as ContentType,
      body: selectedLesson.body || '',
      contentUrl: selectedLesson.contentUrl || '',
      durationMinutes: selectedLesson.durationMinutes ?? 15,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLessonId]);

  const typeMeta = LESSON_TYPES.find((t) => t.value === draft.type);
  const isDirty = selectedLesson
    ? (selectedLesson.title !== draft.title ||
        normalizeLessonType(selectedLesson.type) !== draft.type ||
        (selectedLesson.body || '') !== draft.body ||
        (selectedLesson.contentUrl || '') !== draft.contentUrl ||
        (selectedLesson.durationMinutes ?? 15) !== draft.durationMinutes)
    : false;

  /* ----------------------------- handlers ----------------------------- */

  const handleCreateModule = async () => {
    if (!newModuleTitle.trim()) return;
    const ok = await curriculum.addModule(newModuleTitle);
    if (ok) {
      toast.success('Module added to the curriculum');
      setNewModuleTitle('');
    }
  };

  const handleQuickAddLesson = async (moduleId: string) => {
    if (!quickAddTitle.trim()) return;
    const created = await curriculum.addLesson(moduleId, {
      title: quickAddTitle,
      type: 'TEXT',
      body: '',
      durationMinutes: 15,
    });
    if (created) {
      toast.success('Lesson created — refine it in the editor');
      setQuickAddTitle('');
      setQuickAddModuleId(null);
    }
  };

  const handleSaveLesson = async () => {
    if (!selectedLesson) return;
    if (!draft.title.trim()) {
      toast.error('Lesson title is required');
      return;
    }
    if (typeMeta?.needsUrl && !draft.contentUrl?.trim()) {
      toast.error(`${typeMeta.label} lessons require a content URL`);
      return;
    }
    const ok = await curriculum.saveLesson(selectedLesson.id, draft);
    if (ok) toast.success('Lesson saved');
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    const ok =
      confirmDelete.kind === 'module'
        ? await curriculum.removeModule(confirmDelete.id)
        : await curriculum.removeLesson(confirmDelete.id);
    setDeleting(false);
    if (ok) {
      toast.success(confirmDelete.kind === 'module' ? 'Module deleted' : 'Lesson deleted');
      setConfirmDelete(null);
    }
  };

  /* --------------------------- derived stats -------------------------- */

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalMinutes = modules.reduce((sum, m) => sum + moduleMinutes(m), 0);

  /* ------------------------------ views ------------------------------- */

  if (loading) return <CurriculumSkeleton />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum Builder"
        description={
          course
            ? `Structure the learning path for “${course.title}” — modules, lessons, and pacing.`
            : 'Structure the learning path — modules, lessons, and pacing.'
        }
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'My Courses', href: '/mentor/courses' },
          { label: 'Curriculum' },
        ]}
        actions={
          <div className="flex gap-2.5">
            {courseId && (
              <Link to={`/mentor/courses/${courseId}/materials`}>
                <Button size="sm" variant="outline" leftIcon={<FileStack className="w-4 h-4" />}>
                  Files & Materials
                </Button>
              </Link>
            )}
            {courseId && (
              <Link to={`/courses/${courseId}`} target="_blank">
                <Button size="sm" variant="ghost" leftIcon={<ExternalLink className="w-4 h-4" />}>
                  Preview
                </Button>
              </Link>
            )}
          </div>
        }
      />

      {/* Curriculum-wide error (fetch failed entirely) */}
      {error && modules.length === 0 && (
        <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-sm text-red-800 flex items-center justify-between gap-3">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={() => curriculum.load()}>
            Try again
          </Button>
        </div>
      )}

      {/* Stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Modules</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{modules.length}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <ListVideo className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Lessons</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{totalLessons}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Est. Content</p>
            <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
              {totalMinutes >= 60 ? `${Math.round((totalMinutes / 60) * 10) / 10} h` : `${totalMinutes} min`}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Course Status</p>
            <div className="mt-0.5">
              {course ? <StatusBadge status={course.status} /> : <span className="text-xs text-neutral-400">—</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Split-pane workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT — Curriculum tree */}
        <div className="lg:col-span-5 space-y-4">
          {modules.length === 0 && !error ? (
            <EmptyCurriculum
              onCreateFirst={async () => {
                const ok = await curriculum.addModule('Module 1: Introduction & Foundations');
                if (ok) toast.success('First module created — start adding lessons!');
              }}
            />
          ) : (
            <div className="space-y-3">
              {modules.map((mod, idx) => {
                const collapsed = collapsedModuleIds.includes(mod.id);
                return (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    index={idx}
                    total={modules.length}
                    collapsed={collapsed}
                    pendingId={pendingId}
                    isEditing={editingModuleId === mod.id}
                    isQuickAdding={quickAddModuleId === mod.id}
                    quickAddTitle={quickAddTitle}
                    onQuickAddTitleChange={setQuickAddTitle}
                    onToggle={() => curriculum.toggleModule(mod.id)}
                    onStartRename={() => curriculum.setEditingModule(mod.id)}
                    onCommitRename={async (title) => {
                      const ok = await curriculum.renameModule(mod.id, title);
                      if (ok) toast.success('Module renamed');
                      curriculum.setEditingModule(null);
                    }}
                    onCancelRename={() => curriculum.setEditingModule(null)}
                    onMove={(dir) => curriculum.moveModule(mod.id, dir)}
                    onDelete={() =>
                      setConfirmDelete({
                        kind: 'module',
                        id: mod.id,
                        title: mod.title,
                        lessonCount: mod.lessons.length,
                      })
                    }
                    onStartQuickAdd={() => {
                      // Ensure the module is expanded before showing the composer
                      if (collapsed) curriculum.toggleModule(mod.id);
                      setQuickAddModuleId(mod.id);
                      setQuickAddTitle('');
                    }}
                    onQuickAddSubmit={() => handleQuickAddLesson(mod.id)}
                    onCancelQuickAdd={() => {
                      setQuickAddModuleId(null);
                      setQuickAddTitle('');
                    }}
                    selectedLessonId={selectedLessonId}
                    onSelectLesson={(lessonId) => curriculum.selectLesson(lessonId)}
                    onMoveLesson={(lessonId, dir) => curriculum.moveLesson(mod.id, lessonId, dir)}
                    onDeleteLesson={(lesson) =>
                      setConfirmDelete({ kind: 'lesson', id: lesson.id, title: lesson.title })
                    }
                  />
                );
              })}
            </div>
          )}

          {/* Add module — inline composer */}
          <div className="rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/60 p-3 hover:border-brand-300 transition-colors">
            <div className="flex items-center gap-2">
              <input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateModule();
                }}
                placeholder="New module title — e.g. “Module 3: Advanced Patterns”"
                className="flex-1 bg-transparent px-2 py-1.5 text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none"
              />
              <Button
                size="sm"
                variant="primary"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={handleCreateModule}
                isLoading={pendingId === 'new-module'}
                disabled={!newModuleTitle.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT — Lesson editor / overview */}
        <div className="lg:col-span-7 lg:sticky lg:top-6">
          {selectedLesson ? (
            <LessonEditorPanel
              key={selectedLesson.id}
              lesson={selectedLesson}
              draft={draft}
              setDraft={setDraft}
              fieldErrors={fieldErrors}
              pending={pendingId === selectedLesson.id}
              isDirty={isDirty}
              onSave={handleSaveLesson}
              onRevert={() => {
                curriculum.selectLesson(null);
                curriculum.selectLesson(selectedLesson.id);
              }}
              onDelete={() =>
                setConfirmDelete({ kind: 'lesson', id: selectedLesson.id, title: selectedLesson.title })
              }
              onClose={() => curriculum.selectLesson(null)}
            />
          ) : (
            <OverviewPanel
              moduleCount={modules.length}
              lessonCount={totalLessons}
              minutes={totalMinutes}
              courseId={courseId}
            />
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleConfirmDelete}
        isLoading={deleting}
        variant="danger"
        title={confirmDelete?.kind === 'module' ? 'Delete module?' : 'Delete lesson?'}
        message={
          confirmDelete?.kind === 'module'
            ? `“${confirmDelete.title}” and its ${confirmDelete.lessonCount} lesson${
                confirmDelete.lessonCount === 1 ? '' : 's'
              } will be permanently removed. This action cannot be undone.`
            : `“${confirmDelete?.title}” will be permanently removed from the curriculum.`
        }
        confirmLabel="Delete"
      />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Module card — collapsible with inline rename + lesson rows          */
/* ------------------------------------------------------------------ */

interface ModuleCardProps {
  module: CourseModule;
  index: number;
  total: number;
  collapsed: boolean;
  pendingId: string | null;
  isEditing: boolean;
  isQuickAdding: boolean;
  quickAddTitle: string;
  onQuickAddTitleChange: (v: string) => void;
  onToggle: () => void;
  onStartRename: () => void;
  onCommitRename: (title: string) => void;
  onCancelRename: () => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
  onStartQuickAdd: () => void;
  onQuickAddSubmit: () => void;
  onCancelQuickAdd: () => void;
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  onMoveLesson: (lessonId: string, dir: -1 | 1) => void;
  onDeleteLesson: (lesson: Lesson) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module: mod,
  index,
  total,
  collapsed,
  pendingId,
  isEditing,
  isQuickAdding,
  quickAddTitle,
  onQuickAddTitleChange,
  onToggle,
  onStartRename,
  onCommitRename,
  onCancelRename,
  onMove,
  onDelete,
  onStartQuickAdd,
  onQuickAddSubmit,
  onCancelQuickAdd,
  selectedLessonId,
  onSelectLesson,
  onMoveLesson,
  onDeleteLesson,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white dark:bg-neutral-900 overflow-hidden transition-shadow',
        collapsed ? 'border-neutral-200/90 dark:border-neutral-800' : 'border-brand-200 shadow-sm'
      )}
    >
      {/* Module header */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onToggle();
        }}
        className="group flex items-center gap-3 p-3.5 cursor-pointer hover:bg-neutral-50/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
            collapsed ? '-rotate-90' : ''
          }`}
        />
        <span className="w-6 h-6 rounded-md bg-brand-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
          {index + 1}
        </span>

        <div className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <InlineTitleEditor
              initial={mod.title}
              onCommit={onCommitRename}
              onCancel={onCancelRename}
            />
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartRename();
              }}
              title="Click to rename"
              className="w-full text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate hover:text-brand-800 transition-colors"
            >
              {mod.title}
            </button>
          )}
          <p className="text-[11px] text-neutral-400 mt-0.5">
            {mod.lessons.length} lesson{mod.lessons.length === 1 ? '' : 's'}
            {moduleMinutes(mod) > 0 && <> · {moduleMinutes(mod)} min</>}
          </p>
        </div>

        {/* Hover actions */}
        <div
          className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <IconBtn
            label="Move up"
            disabled={index === 0}
            pending={pendingId === mod.id}
            onClick={() => onMove(-1)}
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn label="Move down" disabled={index === total - 1} onClick={() => onMove(1)}>
            <ChevronDown className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn label="Rename" onClick={onStartRename}>
            <Pencil className="w-3.5 h-3.5" />
          </IconBtn>
          <IconBtn label="Delete module" danger onClick={onDelete}>
            <Trash2 className="w-3.5 h-3.5" />
          </IconBtn>
        </div>
      </div>

      {/* Collapsible lesson list — animated with the grid-rows technique */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: collapsed ? '0fr' : '1fr' }}
      >
        <div className="overflow-hidden min-h-0">
          <div className="px-3.5 pb-3.5 space-y-1 border-t border-neutral-100 pt-3">
            {mod.lessons.length === 0 && (
              <p className="text-xs text-neutral-400 italic py-2 px-1">
                No lessons yet — add the first one below.
              </p>
            )}

            {mod.lessons.map((lesson, lIdx) => {
              const selected = selectedLessonId === lesson.id;
              return (
                <div
                  key={lesson.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectLesson(lesson.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSelectLesson(lesson.id);
                  }}
                  className={`group/lesson flex items-center gap-2.5 rounded-lg px-2.5 py-2 cursor-pointer border transition-colors focus:outline-none ${
                    selected
                      ? 'border-brand-300 bg-brand-50/80 ring-1 ring-brand-300'
                      : 'border-transparent hover:border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <LessonTypeBadge type={lesson.type} variant="icon" />

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm truncate ${
                        selected ? 'font-semibold text-brand-900' : 'text-neutral-800 dark:text-neutral-200'
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p className="text-[11px] text-neutral-400">{lessonDuration(lesson)}</p>
                  </div>

                  <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                    <IconBtn
                      label="Move lesson up"
                      disabled={lIdx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveLesson(lesson.id, -1);
                      }}
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn
                      label="Move lesson down"
                      disabled={lIdx === mod.lessons.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveLesson(lesson.id, 1);
                      }}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </IconBtn>
                    <IconBtn
                      label="Delete lesson"
                      danger
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteLesson(lesson);
                      }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </IconBtn>
                  </div>
                </div>
              );
            })}

            {/* Quick-add lesson row */}
            {isQuickAdding ? (
              <div className="flex items-center gap-2 rounded-lg border border-brand-300 bg-white dark:bg-neutral-900 px-2.5 py-1.5 mt-1">
                <Plus className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                <input
                  autoFocus
                  value={quickAddTitle}
                  onChange={(e) => onQuickAddTitleChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onQuickAddSubmit();
                    if (e.key === 'Escape') onCancelQuickAdd();
                  }}
                  placeholder="Lesson title, then press Enter…"
                  className="flex-1 bg-transparent text-sm text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 focus:outline-none"
                />
                {pendingId === `new-lesson-${mod.id}` && (
                  <span className="w-3.5 h-3.5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin shrink-0" />
                )}
                <button onClick={onCancelQuickAdd} className="text-neutral-400 hover:text-neutral-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartQuickAdd();
                }}
                className="w-full flex items-center gap-2 rounded-lg px-2.5 py-2 mt-1 text-xs font-semibold text-neutral-400 hover:text-brand-800 hover:bg-brand-50 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add lesson
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Right pane — lesson editor                                          */
/* ------------------------------------------------------------------ */

interface LessonEditorPanelProps {
  lesson: Lesson;
  draft: LessonDraft;
  setDraft: React.Dispatch<React.SetStateAction<LessonDraft>>;
  fieldErrors: Record<string, string>;
  pending: boolean;
  isDirty: boolean;
  onSave: () => void;
  onRevert: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const LessonEditorPanel: React.FC<LessonEditorPanelProps> = ({
  lesson,
  draft,
  setDraft,
  fieldErrors,
  pending,
  isDirty,
  onSave,
  onRevert,
  onDelete,
  onClose,
}) => {
  const typeMeta = LESSON_TYPES.find((t) => t.value === draft.type);
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-neutral-100 bg-neutral-50/60 dark:bg-neutral-800/60">
        <div className="flex items-center gap-2.5 min-w-0">
          <LessonTypeBadge type={draft.type} />
          <p className="text-xs text-neutral-400 truncate">
            Lesson editor {isDirty && <span className="text-amber-600 font-semibold">• unsaved</span>}
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
          aria-label="Close editor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Lesson type picker — visual chips */}
        <div>
          <label className="block text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2">
            Content Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            {LESSON_TYPES.map((t) => {
              const active = draft.type === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  title={t.hint}
                  onClick={() => setDraft((d) => ({ ...d, type: t.value }))}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all active:scale-[0.97] ${
                    active
                      ? `${t.badgeClass} ring-2 ring-offset-1 ring-brand-400 shadow-sm`
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
                  }`}
                >
                  {t.label}
                  {active && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
          {typeMeta && <p className="mt-1.5 text-[11px] text-neutral-400">{typeMeta.hint}</p>}
          <FieldError message={fieldErrors.type} />
        </div>

        <div>
          <Input
            label="Lesson Title"
            value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
            placeholder="e.g. 2.1 Dependency Injection in Practice"
            error={fieldErrors.title}
          />
        </div>

        <div>
          <Textarea
            label="Lesson Body / Instructions"
            rows={6}
            value={draft.body}
            onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
            placeholder="Walk students through the concept, include the exercise brief, code snippets, or reading notes…"
            error={fieldErrors.body}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label={`Content URL${typeMeta?.needsUrl ? ' (required for this type)' : ' (optional)'}`}
              value={draft.contentUrl}
              onChange={(e) => setDraft((d) => ({ ...d, contentUrl: e.target.value }))}
              placeholder="https://…"
              error={fieldErrors.contentUrl}
            />
          </div>
          <Input
            label="Duration (minutes)"
            type="number"
            min={1}
            max={600}
            value={draft.durationMinutes ?? 15}
            onChange={(e) =>
              setDraft((d) => ({ ...d, durationMinutes: Number(e.target.value) || undefined }))
            }
            error={fieldErrors.durationMinutes}
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-neutral-100">
          <Button
            variant="primary"
            onClick={onSave}
            isLoading={pending}
            disabled={!isDirty}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Save Lesson
          </Button>
          <Button variant="outline" onClick={onRevert} disabled={!isDirty || pending}>
            Revert
          </Button>
          <Button variant="ghost" className="text-red-600 hover:bg-red-50 ml-auto" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Right pane — overview / onboarding (nothing selected)               */
/* ------------------------------------------------------------------ */

const OverviewPanel: React.FC<{
  moduleCount: number;
  lessonCount: number;
  minutes: number;
  courseId?: string;
}> = ({ moduleCount, lessonCount, minutes, courseId }) => (
  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm p-6 sm:p-8">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center">
        <Sparkles className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Build the learning path</h3>
        <p className="text-xs text-neutral-500">
          Select a lesson on the left to edit it here, or start with the steps below.
        </p>
      </div>
    </div>

    <ol className="mt-6 space-y-4">
      {[
        {
          icon: <Layers className="w-4 h-4" />,
          title: 'Create modules',
          body: 'Group related lessons into weekly or thematic modules using the composer on the left.',
        },
        {
          icon: <Plus className="w-4 h-4" />,
          title: 'Add lessons',
          body: 'Use the quick-add row inside each module, then refine the type, body, and pacing in this editor.',
        },
        {
          icon: <ChevronUp className="w-4 h-4" />,
          title: 'Order the path',
          body: 'Reorder modules and lessons with the arrow controls — students learn in exactly this sequence.',
        },
      ].map((step, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-8 h-8 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-brand-800 flex items-center justify-center shrink-0">
            {step.icon}
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {i + 1}. {step.title}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>

    {moduleCount > 0 && (
      <div className="mt-6 flex items-center gap-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 px-4 py-3 text-xs text-neutral-600 dark:text-neutral-400">
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">Current scope:</span>
        <span>{moduleCount} modules</span>
        <span className="text-neutral-300">·</span>
        <span>{lessonCount} lessons</span>
        <span className="text-neutral-300">·</span>
        <span>{minutes} min of content</span>
      </div>
    )}

    {/* Curriculum vs Materials separation notice */}
    <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50/70 p-4 flex gap-3">
      <FolderOpen className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
      <div className="text-xs text-sky-900">
        <p className="font-bold">Slides, PDFs &amp; downloads live in “Files &amp; Materials”</p>
        <p className="mt-1 leading-relaxed">
          The curriculum above is the structured learning path (modules → lessons). Static file
          resources attached to the course are managed separately and shown to students as
          downloads on the course page.
        </p>
        {courseId && (
          <Link
            to={`/mentor/courses/${courseId}/materials`}
            className="inline-flex items-center gap-1 mt-2 font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-2"
          >
            Open Files &amp; Materials
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Pristine empty state (brand-new course, zero modules)               */
/* ------------------------------------------------------------------ */

const EmptyCurriculum: React.FC<{ onCreateFirst: () => void }> = ({ onCreateFirst }) => (
  <div className="rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-10 text-center">
    <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center mx-auto">
      <BookOpen className="w-7 h-7" />
    </div>
    <h3 className="mt-4 text-base font-bold text-neutral-900 dark:text-neutral-100">This course has no curriculum yet</h3>
    <p className="mt-1.5 text-sm text-neutral-500 max-w-sm mx-auto">
      Modules are the chapters of your course — each one holds a sequence of lessons students
      complete in order.
    </p>
    <Button className="mt-5" variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={onCreateFirst}>
      Create the first module
    </Button>
  </div>
);

/* ------------------------------------------------------------------ */
/* Loading skeleton                                                    */
/* ------------------------------------------------------------------ */

const CurriculumSkeleton: React.FC = () => (
  <div className="space-y-6">
    <Skeleton className="h-16 w-full" />
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[72px] w-full" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
      <div className="lg:col-span-7">
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Micro-components                                                    */
/* ------------------------------------------------------------------ */

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  danger?: boolean;
  pending?: boolean;
}

const IconBtn: React.FC<IconBtnProps> = ({ label, danger, pending, className, children, ...props }) => (
  <button
    {...props}
    title={label}
    aria-label={label}
    className={`rounded-md p-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:opacity-30 disabled:cursor-not-allowed ${
      danger
        ? 'text-neutral-400 hover:text-red-600 hover:bg-red-50'
        : 'text-neutral-400 hover:text-brand-800 hover:bg-brand-50'
    } ${className ?? ''}`}
  >
    {pending ? (
      <span className="block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : (
      children
    )}
  </button>
);

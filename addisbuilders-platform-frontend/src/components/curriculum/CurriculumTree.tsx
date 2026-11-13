import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Layers,
  Paperclip,
  Clock,
  Download,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { CourseModule, CourseMaterial } from '../../types';
import { LessonTypeBadge } from './LessonTypeBadge';
import { cn } from '../../utils';

export interface CurriculumTreeProps {
  modules: CourseModule[];
  /** Optional flat resource list rendered as a "Resources" branch at the end of the tree. */
  materials?: CourseMaterial[];
  className?: string;
  /** Index of a module to expand on first render. Defaults to the first module. */
  defaultExpandedIndex?: number | null;
}

/** Reads a lesson's duration in minutes from either the numeric or legacy string field. */
const lessonMinutes = (lesson: CourseModule['lessons'][number]): number => {
  if (lesson.durationMinutes != null && lesson.durationMinutes > 0) return lesson.durationMinutes;
  const legacy = (lesson as { duration?: string }).duration;
  if (legacy) {
    const parsed = parseInt(legacy, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const sumLessonMinutes = (module: CourseModule): number =>
  module.lessons.reduce((acc, lesson) => acc + lessonMinutes(lesson), 0);

/**
 * Modern hierarchical curriculum tree:
 * Course → collapsible Modules → Lessons (typed icons, durations, links)
 * with an optional "Course Resources" branch for flat materials.
 */
export const CurriculumTree: React.FC<CurriculumTreeProps> = ({
  modules,
  materials = [],
  className,
  defaultExpandedIndex,
}) => {
  const initialExpanded = new Set<number | string>();
  if (defaultExpandedIndex != null && modules[defaultExpandedIndex]) {
    initialExpanded.add(modules[defaultExpandedIndex].id);
  } else if (modules.length > 0) {
    initialExpanded.add(modules[0].id);
  }
  const [expanded, setExpanded] = useState<Set<number | string>>(initialExpanded);

  const toggle = (id: number | string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  if (modules.length === 0 && materials.length === 0) return null;

  return (
    <div className={cn('space-y-3', className)}>
      {modules.map((module, index) => {
        const isOpen = expanded.has(module.id);
        const lessonCount = module.lessons.length;
        const totalMinutes = sumLessonMinutes(module);

        return (
          <div
            key={module.id}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition-colors"
          >
            {/* Module header */}
            <button
              type="button"
              onClick={() => toggle(module.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-3.5 px-4 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 transition-colors"
            >
              <span className="w-9 h-9 shrink-0 rounded-xl bg-brand-800 dark:bg-brand-700 text-white flex items-center justify-center text-sm font-bold shadow-xs">
                {index + 1}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  {module.title}
                </span>
                <span className="mt-0.5 flex items-center gap-3 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {lessonCount} {lessonCount === 1 ? 'Lesson' : 'Lessons'}
                  </span>
                  {totalMinutes > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {totalMinutes} min
                    </span>
                  )}
                </span>
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 w-7 h-7 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 flex items-center justify-center"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            {/* Lessons */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="lessons"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    {lessonCount === 0 ? (
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 italic px-3 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                        Lessons for this module are being prepared and will be released progressively.
                      </p>
                    ) : (
                      <div className="relative ml-[18px] border-l-2 border-neutral-200 dark:border-neutral-700 space-y-1.5 pl-4">
                        {module.lessons.map((lesson) => {
                          const href =
                            lesson.contentUrl ||
                            (lesson as { videoUrl?: string }).videoUrl ||
                            (lesson as { documentUrl?: string }).documentUrl ||
                            null;
                          return (
                            <div
                              key={lesson.id}
                              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 bg-neutral-50/70 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
                            >
                              {/* Tree connector dot */}
                              <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-brand-700 dark:border-brand-400 bg-white dark:bg-neutral-900" />

                              <LessonTypeBadge type={lesson.type} variant="icon" />

                              <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <LessonTypeBadge type={lesson.type} variant="chip" />
                                  {lessonMinutes(lesson) > 0 && (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                                      <Clock className="w-3 h-3" />
                                      {lessonMinutes(lesson)} min
                                    </span>
                                  )}
                                </div>
                              </div>

                              {href && (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 text-[11px] font-semibold text-brand-800 dark:text-brand-300 hover:underline inline-flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  Open
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Course Resources branch */}
      {materials.length > 0 && (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
          <div className="flex items-center gap-3.5 px-4 py-4">
            <span className="w-9 h-9 shrink-0 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
              <Paperclip className="w-4 h-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Course Resources &amp; Materials
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                <Layers className="w-3 h-3" />
                {materials.length} downloadable {materials.length === 1 ? 'resource' : 'resources'}
              </span>
            </span>
          </div>
          <div className="px-4 pb-4 space-y-1.5">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-neutral-50/70 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <LessonTypeBadge type={mat.type === 'VIDEO' ? 'VIDEO' : 'PDF_DOWNLOAD'} variant="icon" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                      {mat.title}
                    </p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {mat.type}
                      {mat.size ? ` • ${mat.size}` : ''}
                      {mat.duration ? ` • ${mat.duration}` : ''}
                    </p>
                  </div>
                </div>
                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-[11px] font-semibold text-brand-800 dark:text-brand-300 hover:underline inline-flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Access
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

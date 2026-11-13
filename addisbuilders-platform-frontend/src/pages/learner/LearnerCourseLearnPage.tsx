import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { enrollmentsService } from '../../services/enrollments.service';
import { apiErrorMessage, cn } from '../../utils';
import { Course, CourseModule, Lesson } from '../../types';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import { LessonTypeBadge, normalizeLessonType } from '../../components/curriculum/LessonTypeBadge';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  ChevronRight,
  ChevronLeft,
  Download,
  BookOpen,
  Award,
  Sparkles,
  ExternalLink,
  FlaskConical,
  PanelLeftClose,
  PanelLeftOpen,
  PartyPopper,
  MonitorPlay,
  Clock,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Normalized content type for rendering decisions. */
const typeOf = (lesson: Lesson): string => normalizeLessonType(lesson.type);

/**
 * Parses a video URL into an embeddable player config.
 * Supports YouTube (watch / youtu.be / embed / shorts), Vimeo, and direct
 * HTML5 media files. Returns null for un-embeddable URLs.
 */
function parseVideoPlayer(url: string): { kind: 'iframe' | 'html5'; src: string } | null {
  if (!url) return null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/);
  if (yt) return { kind: 'iframe', src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` };
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)) return { kind: 'html5', src: url };
  return null;
}

function filenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    const name = decodeURIComponent(pathname.split('/').pop() || '');
    return name || 'resource';
  } catch {
    return 'resource';
  }
}

/** Formats the lesson duration from the authoritative `durationMinutes`. */
const lessonDurationLabel = (lesson: Lesson): string | null => {
  if (lesson.durationMinutes != null) return `${lesson.durationMinutes} min`;
  return lesson.duration || null;
};

/* ------------------------------------------------------------------ */
/* Lightweight body renderer (markdown-lite, XSS-safe by construction) */
/* ------------------------------------------------------------------ */

/** Inline formatting: **bold**, *italic*, `code` — returned as React nodes. */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-bold text-neutral-900 dark:text-neutral-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`')) {
      nodes.push(
        <code key={key++} className="rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-1.5 py-0.5 text-[0.85em] font-mono text-brand-900">
          {token.slice(1, -1)}
        </code>
      );
    } else {
      nodes.push(
        <em key={key++} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * Renders `lesson.body` with clean block formatting — headings, bullet /
 * numbered lists, quotes, and paragraphs. Builds React nodes directly
 * (no `dangerouslySetInnerHTML`), so untrusted backend content is safe.
 */
export const LessonBodyRenderer: React.FC<{ body?: string; className?: string }> = ({
  body,
  className,
}) => {
  const blocks = useMemo(() => {
    if (!body?.trim()) return [];
    const out: React.ReactNode[] = [];
    const lines = body.replace(/\r\n/g, '\n').split('\n');
    let list: { ordered: boolean; items: string[] } | null = null;

    const flushList = () => {
      if (!list) return;
      const items = list.items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {renderInline(item)}
        </li>
      ));
      out.push(
        list.ordered ? (
          <ol key={out.length} className="list-decimal pl-5 space-y-1.5 marker:font-semibold marker:text-brand-700">
            {items}
          </ol>
        ) : (
          <ul key={out.length} className="list-disc pl-5 space-y-1.5 marker:text-brand-600">
            {items}
          </ul>
        )
      );
      list = null;
    };

    lines.forEach((raw, idx) => {
      const line = raw.trim();
      const bullet = line.match(/^[-*]\s+(.*)$/);
      const numbered = line.match(/^\d+[.)]\s+(.*)$/);
      if (bullet) {
        if (!list || list.ordered) {
          flushList();
          list = { ordered: false, items: [] };
        }
        list.items.push(bullet[1]);
        return;
      }
      if (numbered) {
        if (!list || !list.ordered) {
          flushList();
          list = { ordered: true, items: [] };
        }
        list.items.push(numbered[1]);
        return;
      }
      flushList();
      if (!line) return;
      if (line.startsWith('### ')) {
        out.push(
          <h4 key={idx} className="mt-5 mb-1.5 text-sm font-bold text-neutral-900 dark:text-neutral-100 first:mt-0">
            {renderInline(line.slice(4))}
          </h4>
        );
      } else if (line.startsWith('## ') || line.startsWith('# ')) {
        out.push(
          <h3 key={idx} className="mt-6 mb-2 text-base font-bold text-neutral-900 dark:text-neutral-100 first:mt-0">
            {renderInline(line.replace(/^#+\s/, ''))}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        out.push(
          <blockquote
            key={idx}
            className="border-l-4 border-brand-300 bg-brand-50/60 rounded-r-lg px-4 py-2.5 text-neutral-700 dark:text-neutral-300 italic"
          >
            {renderInline(line.slice(2))}
          </blockquote>
        );
      } else {
        out.push(
          <p key={idx} className="leading-relaxed">
            {renderInline(line)}
          </p>
        );
      }
    });
    flushList();
    return out;
  }, [body]);

  if (blocks.length === 0) return null;
  return <div className={cn('space-y-3 text-sm text-neutral-700 dark:text-neutral-300', className)}>{blocks}</div>;
};

/* ------------------------------------------------------------------ */
/* Smart content renderer — renders `contentUrl` by lesson type        */
/* ------------------------------------------------------------------ */

export const SmartContentRenderer: React.FC<{ lesson: Lesson; instructorName?: string }> = ({
  lesson,
  instructorName,
}) => {
  const type = typeOf(lesson);
  const url = lesson.contentUrl?.trim() || lesson.videoUrl?.trim() || lesson.documentUrl?.trim() || '';
  const isHttp = url.startsWith('http://') || url.startsWith('https://');

  // --- Video: responsive embedded player -------------------------------
  if (type === 'VIDEO' || type === 'VIDEO_URL') {
    if (url && isHttp) {
      const player = parseVideoPlayer(url);
      if (player?.kind === 'iframe') {
        return (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-950 shadow-lg ring-1 ring-neutral-900/10">
            <iframe
              key={url}
              src={player.src}
              title={lesson.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        );
      }
      if (player?.kind === 'html5') {
        return (
          <div className="rounded-2xl overflow-hidden bg-neutral-950 shadow-lg ring-1 ring-neutral-900/10">
            <video key={url} src={player.src} controls className="w-full aspect-video" preload="metadata">
              Your browser does not support embedded video.
            </video>
          </div>
        );
      }
      // Un-embeddable URL → open externally
      return (
        <ExternalActionCard
          icon={<MonitorPlay className="w-6 h-6" />}
          label="Watch the lecture"
          description="This lecture is hosted on an external platform."
          url={url}
          cta="Open Lecture Video"
        />
      );
    }
    return (
      <div className="relative aspect-video w-full rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-dashed border-neutral-300 flex flex-col items-center justify-center text-center p-6">
        <PlayCircle className="w-12 h-12 text-neutral-300" />
        <p className="mt-3 text-sm font-semibold text-neutral-500">Video coming soon</p>
        <p className="mt-1 text-xs text-neutral-400 max-w-xs">
          {instructorName ? `${instructorName} hasn’t` : 'The mentor hasn’t'} attached a video source
          to this lecture yet.
        </p>
      </div>
    );
  }

  // --- PDF download: clean resource card --------------------------------
  if (type === 'PDF_DOWNLOAD' || type === 'DOCUMENT') {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <FileText className="w-6 h-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">Downloadable Resource</p>
          <p className="text-xs text-neutral-500 truncate mt-0.5">
            {url ? filenameFromUrl(url) : 'The mentor hasn’t attached a document yet.'}
          </p>
        </div>
        {url && isHttp && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download
            </Button>
          </a>
        )}
      </div>
    );
  }

  // --- Lab / Link: external action button -------------------------------
  if (type === 'LAB' || type === 'LINK') {
    const isLab = type === 'LAB';
    return (
      <div
        className={cn(
          'rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4',
          isLab ? 'border-emerald-200 bg-emerald-50/60' : 'border-sky-200 bg-sky-50/60'
        )}
      >
        <div
          className={cn(
            'w-12 h-12 rounded-xl text-white flex items-center justify-center shrink-0 shadow-sm',
            isLab ? 'bg-emerald-600' : 'bg-sky-600'
          )}
        >
          {isLab ? <FlaskConical className="w-6 h-6" /> : <ExternalLink className="w-6 h-6" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {isLab ? 'Hands-on Lab Environment' : 'External Resource'}
          </p>
          <p className="text-xs text-neutral-500 truncate mt-0.5">
            {url || 'No URL attached yet — check back soon.'}
          </p>
        </div>
        {url && isHttp && (
          <a href={url} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button
              variant={isLab ? 'success' : 'primary'}
              size="sm"
              rightIcon={<ExternalLink className="w-4 h-4" />}
            >
              {isLab ? 'Open Lab Repository' : 'Open Resource'}
            </Button>
          </a>
        )}
      </div>
    );
  }

  // --- Article / Text (default): no media block, body is the content ----
  if (url && isHttp && type !== 'ARTICLE' && type !== 'TEXT') {
    return (
      <ExternalActionCard
        icon={<ExternalLink className="w-6 h-6" />}
        label="Supplementary resource"
        description="An additional reference accompanies this lesson."
        url={url}
        cta="Open Resource"
      />
    );
  }
  return null;
};

const ExternalActionCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  description: string;
  url: string;
  cta: string;
}> = ({ icon, label, description, url, cta }) => (
  <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-brand-800 text-white flex items-center justify-center shrink-0 shadow-sm">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{label}</p>
      <p className="text-xs text-neutral-500 truncate mt-0.5">{description}</p>
    </div>
    {url.startsWith('http') && (
      <a href={url} target="_blank" rel="noopener noreferrer" className="shrink-0">
        <Button variant="primary" size="sm" rightIcon={<ExternalLink className="w-4 h-4" />}>
          {cta}
        </Button>
      </a>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const LearnerCourseLearnPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /**
   * Authoritative completed-lesson ids, seeded from
   * `GET /courses/{courseId}/progress` (`CourseProgressResponse.
   * completedLessonIds`) and the mock store's persisted `isCompleted` flags.
   * This is the single source of truth for progress rendering — previously
   * the page kept it in component state, which reset to 0% on refresh.
   */
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!courseId) return;
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      setError(null);
      const [c, mods, progress] = await Promise.all([
        coursesService.getCourseById(courseId).catch((err) => {
          if (isMounted) setError(apiErrorMessage(err, 'Failed to load the course.'));
          return null;
        }),
        enrollmentsService.getCourseModules(courseId).catch((err) => {
          if (isMounted) setError(apiErrorMessage(err, 'Failed to load the curriculum.'));
          return [] as CourseModule[];
        }),
        // Bug 2 fix: authoritative progress on load
        enrollmentsService.getCourseProgress(courseId).catch(() => null),
      ]);
      if (!isMounted) return;

      setCourse(c);
      setModules(mods);

      // Merge server-reported ids with any persisted mock completion flags.
      const ids = new Set<string>((progress?.completedLessonIds ?? []).map((id) => String(id)));
      mods.forEach((m) => m.lessons.forEach((l) => l.isCompleted && ids.add(String(l.id))));
      setCompletedIds(ids);

      // Resume where the student left off: first incomplete lesson.
      const allLessons = mods.flatMap((m) => m.lessons);
      const firstIncomplete =
        allLessons.find((l) => !ids.has(String(l.id))) || allLessons[0] || null;
      setActiveLessonId(firstIncomplete ? String(firstIncomplete.id) : null);
      setLoading(false);
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  /* ------------------------ derived curriculum ------------------------ */

  const allLessons = useMemo(() => modules.flatMap((m) => m.lessons), [modules]);
  const activeLesson = useMemo(
    () => allLessons.find((l) => String(l.id) === activeLessonId) ?? null,
    [allLessons, activeLessonId]
  );

  const activeIndex = allLessons.findIndex((l) => String(l.id) === activeLessonId);
  const prevLesson = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson =
    activeIndex >= 0 && activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = allLessons.filter((l) => completedIds.has(String(l.id))).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const allDone = totalLessons > 0 && completedCount === totalLessons;
  const activeDone = activeLesson ? completedIds.has(String(activeLesson.id)) : false;

  const isLessonComplete = useCallback(
    (lesson: Lesson) => completedIds.has(String(lesson.id)) || !!lesson.isCompleted,
    [completedIds]
  );

  /* --------------------------- completion ----------------------------- */

  const handleMarkFinished = async () => {
    if (!activeLesson || !courseId || activeDone) return;
    const lessonId = String(activeLesson.id);
    const snapshot = new Set(completedIds);

    // Optimistic update — UI reflects completion instantly.
    setCompletedIds((prev) => new Set(prev).add(lessonId));
    setCompleting(true);
    try {
      const result = await enrollmentsService.markLessonComplete(courseId, activeLesson.id, user?.id);
      if (result && typeof result.progressPercentage === 'number') {
        toast.success(
          result.progressPercentage >= 100
            ? 'Course complete — outstanding work! 🎉'
            : `Lesson finished — ${Math.round(result.progressPercentage)}% of the course complete`
        );
      } else {
        toast.success('Lesson marked as finished!');
      }
    } catch (err) {
      // Roll back on failure so the UI never lies.
      setCompletedIds(snapshot);
      toast.error(apiErrorMessage(err, 'Failed to update lesson completion status'));
    } finally {
      setCompleting(false);
    }
  };

  /* ------------------------------ views ------------------------------- */

  if (loading) {
    return <LoadingSpinner size="lg" label="Opening interactive learning classroom..." />;
  }

  if (error && !course) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-4">
        <ErrorState
          title="Curriculum Unavailable"
          message={error}
          onRetry={() => window.location.reload()}
        />
        <div className="text-center">
          <Link to="/learner/courses">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to My Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <ErrorState
          title="Course Not Found"
          message="This course may have been unpublished. Browse your enrollments to continue learning."
          onRetry={() => navigate('/learner/courses')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-[1500px] mx-auto">
      {/* ------- Prominent progress header ------- */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              title={sidebarOpen ? 'Hide curriculum' : 'Show curriculum'}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors shrink-0"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-5 h-5" />
              ) : (
                <PanelLeftOpen className="w-5 h-5" />
              )}
            </button>
            <Link
              to="/learner/courses"
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors shrink-0 hidden sm:block"
              title="Back to Enrolled Courses"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 border border-brand-200 rounded-md px-1.5 py-0.5">
                  {course.category}
                </span>
                <span className="text-xs text-neutral-500 truncate">Instructor: {course.instructorName}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-0.5 truncate">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 md:border-l md:border-neutral-200 md:pl-6">
            <div className="w-40 sm:w-56 space-y-1.5">
              <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 font-semibold">
                <span>
                  {completedCount} of {totalLessons} lessons
                </span>
                <span className="text-brand-900 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    allDone ? 'bg-emerald-600' : 'bg-brand-700'
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            {allDone && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                <Award className="w-4 h-4 text-emerald-600" /> Finished
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ------- Split-pane classroom ------- */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Collapsible curriculum sidebar */}
        <div
          className={cn(
            'shrink-0 transition-all duration-300 ease-in-out w-full overflow-hidden',
            sidebarOpen ? 'lg:w-96 opacity-100' : 'lg:w-0 lg:opacity-0 max-lg:hidden'
          )}
        >
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs overflow-hidden">
            <div className="px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/75 dark:bg-neutral-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                <BookOpen className="w-4 h-4 text-brand-700" />
                <span>Curriculum</span>
              </div>
              <span className="text-xs font-semibold text-neutral-500">
                {completedCount}/{totalLessons} done
              </span>
            </div>

            <div className="divide-y divide-neutral-100 max-h-[calc(100vh-300px)] overflow-y-auto">
              {modules.length === 0 && (
                <p className="p-6 text-xs text-neutral-400 text-center italic">
                  The mentor hasn’t published the curriculum yet.
                </p>
              )}
              {modules.map((module, mIdx) => {
                const modDone = module.lessons.filter((l) => isLessonComplete(l)).length;
                const modTotal = module.lessons.length;
                return (
                  <div key={module.id} className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="w-5 h-5 rounded bg-brand-100 text-brand-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {mIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
                          {module.title}
                        </span>
                      </div>
                      {modTotal > 0 && (
                        <span
                          className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0',
                            modDone === modTotal
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                          )}
                        >
                          {modDone}/{modTotal}
                        </span>
                      )}
                    </div>
                    {module.description && (
                      <p className="text-[11px] text-neutral-400 leading-snug pl-7">{module.description}</p>
                    )}

                    <div className="space-y-1 pl-1">
                      {module.lessons.map((lesson) => {
                        const done = isLessonComplete(lesson);
                        const isActive = String(lesson.id) === activeLessonId;
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => setActiveLessonId(String(lesson.id))}
                            className={cn(
                              'w-full text-left p-2 rounded-xl text-xs flex items-center gap-2 transition-colors group',
                              isActive
                                ? 'bg-brand-900 text-white font-semibold shadow-xs'
                                : 'hover:bg-neutral-100 text-neutral-700 dark:text-neutral-300'
                            )}
                          >
                            {done ? (
                              <CheckCircle2
                                className={cn(
                                  'w-4 h-4 shrink-0',
                                  isActive ? 'text-emerald-300' : 'text-emerald-600'
                                )}
                              />
                            ) : (
                              <Circle
                                className={cn(
                                  'w-4 h-4 shrink-0',
                                  isActive ? 'text-brand-300' : 'text-neutral-300'
                                )}
                              />
                            )}
                            <span className="truncate flex-1 min-w-0">{lesson.title}</span>
                            {lessonDurationLabel(lesson) && (
                              <span
                                className={cn(
                                  'text-[10px] shrink-0 inline-flex items-center gap-0.5',
                                  isActive ? 'text-brand-200' : 'text-neutral-400'
                                )}
                              >
                                <Clock className="w-3 h-3" />
                                {lessonDurationLabel(lesson)}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lesson workspace */}
        <div className="flex-1 min-w-0 w-full">
          {activeLesson ? (
            <div className="space-y-5">
              {/* Completion success banner */}
              {allDone && (
                <div className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-brand-50 p-4 sm:p-5 flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-emerald-900">Course completed — congratulations!</p>
                    <p className="text-xs text-emerald-700/80 mt-0.5">
                      You’ve finished all {totalLessons} lessons. Revisit any lesson below or explore your
                      next course.
                    </p>
                  </div>
                  <Link to="/learner/courses" className="hidden sm:block shrink-0">
                    <Button size="sm" variant="outline">
                      My Courses
                    </Button>
                  </Link>
                </div>
              )}

              <Card className="bg-white dark:bg-neutral-900 shadow-xs">
                <CardContent className="p-5 sm:p-8 space-y-6">
                  {/* Lesson header */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <LessonTypeBadge type={activeLesson.type} />
                        {lessonDurationLabel(activeLesson) && (
                          <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                            <Clock className="w-3.5 h-3.5" /> {lessonDurationLabel(activeLesson)}
                          </span>
                        )}
                        <span className="text-xs text-neutral-400">
                          Lesson {activeIndex + 1} of {totalLessons}
                        </span>
                      </div>

                      {activeDone ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Completed
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="success"
                          isLoading={completing}
                          onClick={handleMarkFinished}
                          leftIcon={<CheckCircle2 className="w-4 h-4" />}
                        >
                          Mark as Finished
                        </Button>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
                      {activeLesson.title}
                    </h2>
                  </div>

                  {/* Media / resource content — driven by type + contentUrl */}
                  <SmartContentRenderer lesson={activeLesson} instructorName={course.instructorName} />

                  {/* Lesson body — real content, formatted */}
                  <div className="space-y-3">
                    <LessonBodyRenderer body={activeLesson.body ?? activeLesson.content} />
                    {!activeLesson.body?.trim() &&
                      !activeLesson.content?.trim() &&
                      typeOf(activeLesson) !== 'VIDEO' &&
                      typeOf(activeLesson) !== 'VIDEO_URL' && (
                        <p className="text-sm text-neutral-400 italic">
                          No written notes for this lesson — use the media above to study the material.
                        </p>
                      )}
                  </div>

                  {/* Prev / next navigation */}
                  <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                    {prevLesson ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveLessonId(String(prevLesson.id))}
                        leftIcon={<ChevronLeft className="w-4 h-4" />}
                      >
                        <span className="max-w-36 truncate">Previous: {prevLesson.title}</span>
                      </Button>
                    ) : (
                      <div />
                    )}

                    <div className="flex flex-wrap items-center gap-2.5">
                      {!activeDone && (
                        <Button
                          variant="success"
                          size="sm"
                          isLoading={completing}
                          onClick={handleMarkFinished}
                          leftIcon={<CheckCircle2 className="w-4 h-4" />}
                        >
                          Mark as Finished
                        </Button>
                      )}
                      {nextLesson ? (
                        <Button
                          variant={activeDone ? 'primary' : 'secondary'}
                          size="sm"
                          onClick={() => setActiveLessonId(String(nextLesson.id))}
                          rightIcon={<ChevronRight className="w-4 h-4" />}
                        >
                          Next Lesson
                        </Button>
                      ) : (
                        !activeDone && (
                          <span className="text-xs text-neutral-400">Final lesson — finish to complete the course</span>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500">
              <Sparkles className="w-8 h-8 text-neutral-300 mx-auto mb-3" />
              {totalLessons > 0
                ? 'Select a lesson from the curriculum sidebar to begin studying.'
                : 'This course has no lessons published yet — check back soon.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

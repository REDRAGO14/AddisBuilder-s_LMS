import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { enrollmentsService } from '../../services/enrollments.service';
import { apiErrorMessage } from '../../utils';
import { Course, Enrollment } from '../../types';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import { BookOpen, PlayCircle, Award, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface EnrolledCourseView {
  course: Course;
  enrollment: Enrollment;
  progressPercentage: number;
}

/**
 * "My Courses" — the authoritative view of the student's enrollments.
 * Upgraded with product-designer typography, context pills, and Framer Motion micro-interactions.
 */
export const LearnerCoursesPage: React.FC = () => {
  const { user } = useAuth();
  const [views, setViews] = useState<EnrolledCourseView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [enrollments, catalog] = await Promise.all([
        enrollmentsService.getStudentEnrollments().catch((err) => {
          setError(apiErrorMessage(err, 'Could not load your enrollments.'));
          return [] as Enrollment[];
        }),
        coursesService.getCourses().catch(() => [] as Course[]),
      ]);

      const active = enrollments.filter((e) => e.status !== 'DROPPED');
      const courseById = new Map(catalog.map((c) => [c.id, c]));

      const progressResults = await Promise.all(
        active.map(async (enr) => {
          try {
            const prog = await enrollmentsService.getCourseProgress(enr.courseId);
            const rawPercent =
              (prog as any)?.progressPercentage ??
              (prog as any)?.progress ??
              (prog as any)?.completionPercentage ??
              (enr as any)?.progressPercentage ??
              0;
            return { courseId: enr.courseId, percent: Number(rawPercent) };
          } catch {
            return {
              courseId: enr.courseId,
              percent: Number((enr as any)?.progressPercentage ?? 0),
            };
          }
        })
      );

      const progressMap = new Map<string, number>();
      progressResults.forEach((p) => {
        progressMap.set(p.courseId, p.percent);
      });

      const joined: EnrolledCourseView[] = active
        .map((enrollment) => {
          const course =
            courseById.get(enrollment.courseId) ??
            ({
              id: enrollment.courseId,
              title: enrollment.courseTitle,
              thumbnailUrl: '',
              category: 'Course',
              shortDescription: '',
              durationWeeks: 0,
              status: 'PUBLISHED',
              createdAt: enrollment.enrollmentDate || enrollment.enrolledAt || '',
              updatedAt: '',
            } as unknown as Course);

          const progressPercentage = progressMap.get(enrollment.courseId) ?? 0;
          return { course, enrollment, progressPercentage };
        })
        .sort((a, b) => {
          const aTime = new Date(a.course.createdAt || 0).getTime();
          const bTime = new Date(b.course.createdAt || 0).getTime();
          return bTime - aTime;
        });

      setViews(joined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const formatName = (fullName?: string) => {
    if (!fullName) return 'Student';
    return fullName
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-8 pb-20"
    >
      {/* Top Header with Breadcrumbs & Context Pill */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Learner Workspace</span>
            <span>/</span>
            <span className="text-brand-700 font-bold">My Enrolled Courses</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              My Learning Path, {formatName(user?.fullName)}! 📚
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              Active Enrollee • Verified Curriculum
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Access learning materials, video lectures, and syllabus schedules for your active courses.
          </p>
        </div>

        {/* Magnetic Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/courses">
              <Button 
                size="md" 
                variant="primary" 
                leftIcon={<BookOpen className="w-4 h-4" />}
                className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 hover:from-brand-900 hover:to-emerald-800 text-white shadow-md shadow-brand-900/20 border-0 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                Explore Catalog 🚀
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" label="Loading enrolled courses & progress sync..." />
      ) : error && views.length === 0 ? (
        <ErrorState title="Enrollments Unavailable" message={error} onRetry={load} />
      ) : views.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Enrolled Courses Yet"
          description="Browse our university-curated catalog to enroll in courses taught by experienced mentors."
          action={
            <Link to="/courses">
              <Button variant="primary" size="sm">
                Browse Course Catalog
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {views.map(({ course, enrollment, progressPercentage }) => {
            const progress = Math.round(progressPercentage);
            const isCompleted = enrollment.status === 'COMPLETED' || progress >= 100;

            return (
              <motion.div
                key={enrollment.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  hoverEffect
                  className="bg-white dark:bg-neutral-900 flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-300 h-full"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative bg-neutral-900">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-brand-50 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-brand-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute top-3 left-3">
                        <Badge variant="brand" className="backdrop-blur-md bg-white dark:bg-neutral-900/90 font-medium">
                          {course.category || 'General'}
                        </Badge>
                      </div>

                      {isCompleted && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                            <Award className="w-3.5 h-3.5" /> Completed
                          </span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <div>
                        <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                          {course.shortDescription || 'Master key concepts through structured video lectures and practical labs.'}
                        </p>
                      </div>

                      {/* Modern Progress Bar */}
                      <div className="space-y-2 pt-2 border-t border-neutral-100">
                        <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-neutral-600 dark:text-neutral-400">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                            )}
                            Overall Progress
                          </span>
                          <span className="font-bold text-neutral-900 dark:text-neutral-100">{progress}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-neutral-200/60 dark:border-neutral-800">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isCompleted
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-sm shadow-emerald-500/20'
                                : 'bg-gradient-to-r from-brand-600 to-indigo-600 shadow-sm shadow-brand-500/20'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-neutral-100/60 pt-4">
                    <span className="text-[11px] font-medium text-neutral-400">
                      {isCompleted ? 'Finished successfully' : `${progress}% completed`}
                    </span>
                    <Link to={`/learner/courses/${course.id}/learn`}>
                      <Button
                        size="sm"
                        variant={isCompleted ? 'secondary' : 'primary'}
                        leftIcon={<PlayCircle className="w-4 h-4" />}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        {isCompleted ? 'Review' : 'Continue'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { enrollmentsService } from '../../services/enrollments.service';
import { assignmentsService } from '../../services/assignments.service';
import { applicationsService } from '../../services/applications.service';
import { Course, Assignment, InternshipApplication, Enrollment } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  PlayCircle,
  Award,
  Flame,
  Zap,
} from 'lucide-react';

export const LearnerDashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, number>>({});

  const loadData = useCallback(async () => {
    try {
      const [fetchedCourses, myEnrollments, fetchedAssignments, myApplications] = await Promise.all([
        coursesService.getCourses(),
        enrollmentsService.getStudentEnrollments().catch(() => [] as Enrollment[]),
        assignmentsService.getAssignments().catch(() => [] as Assignment[]),
        applicationsService.getMyApplications().catch(() => [] as InternshipApplication[]),
      ]);
      
      setAllCourses(fetchedCourses);
      setEnrollments(myEnrollments);
      setAssignments(fetchedAssignments);
      setApplications(myApplications);

      const activeEnrs = myEnrollments.filter((e) => e.status !== 'DROPPED');
      const progressResults = await Promise.all(
        activeEnrs.map(async (enr) => {
          try {
            const prog = await enrollmentsService.getCourseProgress(enr.courseId);
            const rawPercent =
              (prog as any)?.progressPercentage ??
              (prog as any)?.progress ??
              (prog as any)?.completionPercentage ??
              0;
            return { courseId: enr.courseId, percent: Number(rawPercent) };
          } catch {
            return { courseId: enr.courseId, percent: Number((enr as any)?.progressPercentage ?? 0) };
          }
        })
      );

      const progMap: Record<string, number> = {};
      progressResults.forEach((p) => {
        progMap[p.courseId] = p.percent;
      });
      setCourseProgressMap(progMap);
    } catch {
      toast.error('Failed to load command center data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData, user]);

  const publishedCourses = allCourses.filter((c) => c.status === 'PUBLISHED');
  const activeEnrollments = enrollments.filter((e) => e.status !== 'DROPPED');
  const enrollmentByCourseId = new Map(activeEnrollments.map((e) => [e.courseId, e]));

  const isEnrolled = useCallback(
    (courseId: string) => enrollmentByCourseId.has(courseId),
    [enrollmentByCourseId]
  );

  const enrolledProgress = (courseId: string): number => {
    if (courseProgressMap[courseId] !== undefined) {
      return Math.round(courseProgressMap[courseId]);
    }
    const enrollment = enrollmentByCourseId.get(courseId);
    if (!enrollment) return 0;
    return Math.round(
      (enrollment as any).progressPercentage ??
      (enrollment as any).progress ??
      (enrollment as any).completionPercentage ??
      0
    );
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Initializing student command center..." />;
  }

  const enrolledCourses = publishedCourses.filter((c) => isEnrolled(c.id));
  const availableToEnroll = publishedCourses.filter((c) => !isEnrolled(c.id));
  const inProgressCourses = enrolledCourses.filter((c) => enrolledProgress(c.id) < 100);
  const completedCourses = enrolledCourses.filter(
    (c) => enrolledProgress(c.id) >= 100 || enrollmentByCourseId.get(c.id)?.status === 'COMPLETED'
  );

  const primaryActiveCourse = inProgressCourses[0] || enrolledCourses[0];
  const primaryProgress = primaryActiveCourse ? enrolledProgress(primaryActiveCourse.id) : 0;

  const formatName = (fullName?: string) => {
    if (!fullName) return 'Student';
    return fullName
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
      .join(' ');
  };

  // Helper to clean markdown symbols for clean display on dashboard cards
  const cleanMarkdown = (text?: string) => {
    if (!text) return 'No instructions provided.';
    return text
      .replace(/###\s+/g, '')
      .replace(/##\s+/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-8 pb-20"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Learner Workspace</span>
            <span>/</span>
            <span className="text-brand-700 font-bold">Command Center</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              Welcome back, {formatName(user?.fullName)}! 👋
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Student • Software Engineering Track
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Monitor your active academic curriculum, upcoming assignment deadlines, and verified career applications in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/learner/internships">
              <Button size="md" variant="outline" leftIcon={<Briefcase className="w-4 h-4 text-indigo-600" />} className="font-bold">
                Explore Internships ✨
              </Button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/courses">
              <Button 
                size="md" 
                variant="primary" 
                leftIcon={<BookOpen className="w-4 h-4" />}
                className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 hover:from-brand-900 hover:to-emerald-800 text-white shadow-md shadow-brand-900/20 border-0"
              >
                Browse Catalog 🚀
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Enrolled Courses</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{enrolledCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 shadow-xs">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">In Progress</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{inProgressCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Completed</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{completedCourses.length}</p>
          </div>
        </Card>

        <Card className="p-4 sm:p-5 flex items-center gap-3.5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 shadow-xs">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Applications</p>
            <p className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-100 mt-0.5">{applications.length}</p>
          </div>
        </Card>
      </div>

      {/* Resume Learning Hero Banner */}
      {primaryActiveCourse ? (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-brand-950 text-white p-6 sm:p-8 shadow-2xl border border-neutral-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Flame className="w-3.5 h-3.5 text-emerald-400 animate-bounce" /> Continue Where You Left Off
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">{primaryActiveCourse.title}</h2>
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2">
                {primaryActiveCourse.shortDescription || 'Advance through your curriculum modules and practical labs.'}
              </p>
              
              <div className="space-y-1.5 pt-2 max-w-md">
                <div className="flex justify-between text-xs text-neutral-300 font-medium">
                  <span>Course Progress</span>
                  <span className="text-white font-bold">{primaryProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-white dark:bg-neutral-900/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${primaryProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Link to={`/learner/courses/${primaryActiveCourse.id}/learn`}>
                <Button size="lg" variant="primary" leftIcon={<PlayCircle className="w-5 h-5" />} className="shadow-lg shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-500 text-white border-0">
                  Resume Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {/* Active Courses & Recent Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-700" /> My Active Courses
            </CardTitle>
            <Link to="/learner/courses">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({enrolledCourses.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {enrolledCourses.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                You have not enrolled in any courses yet.
                <div className="mt-3">
                  <Link to="/courses">
                    <Button size="sm" variant="outline">Explore Catalog</Button>
                  </Link>
                </div>
              </div>
            ) : (
              enrolledCourses.map((course) => {
                const progress = enrolledProgress(course.id);
                const isCompleted = progress >= 100 || enrollmentByCourseId.get(course.id)?.status === 'COMPLETED';
                return (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 hover:border-brand-300 transition-all bg-neutral-50/50 dark:bg-neutral-800/60 space-y-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="brand">{course.category || 'General'}</Badge>
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                              <Award className="w-3 h-3" /> Completed
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mt-2">{course.title}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5">Instructor: {course.instructorName || 'Faculty'}</p>
                      </div>
                      <Link to={`/learner/courses/${course.id}/learn`}>
                        <Button size="sm" variant={isCompleted ? 'secondary' : 'primary'} leftIcon={<PlayCircle className="w-3.5 h-3.5" />}>
                          {isCompleted ? 'Review' : 'Study'}
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-neutral-500">Progress</span>
                        <span className="text-neutral-900 dark:text-neutral-100">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-200/80 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-600' : 'bg-brand-700'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 px-6 py-4">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" /> Recent Internship Applications
            </CardTitle>
            <Link to="/learner/applications">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All ({applications.length})
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-6 space-y-3">
            {applications.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                No active internship applications submitted yet.
                <div className="mt-3">
                  <Link to="/learner/internships">
                    <Button size="sm" variant="outline">Browse Internships</Button>
                  </Link>
                </div>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-all shadow-xs"
                >
                  <div className="min-w-0 pr-3">
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                      {app.internshipTitle}
                    </h4>
                    <p className="text-xs text-brand-700 font-semibold mt-0.5">{app.organizationName}</p>
                    <p className="text-[11px] text-neutral-400 mt-1">Applied: {formatDate(app.appliedAt)}</p>
                  </div>
                  <div className="shrink-0">
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Course Assignments — Cleaned Markdown & Direct Action */}
      <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 px-6 py-4">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" /> Upcoming Course Assignments
          </CardTitle>
          <Link to="/learner/assignments">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              All Assignments ({assignments.length})
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-6">
          {assignments.length === 0 ? (
            <div className="p-6 text-center text-xs text-neutral-500">
              No pending assignments at the moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.slice(0, 4).map((asg) => (
                <div
                  key={asg.id}
                  className="p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/60 space-y-2.5 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-brand-700 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-md">
                        {asg.courseTitle}
                      </span>
                      <span className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 px-2.5 py-0.5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs">
                        {asg.totalPoints || asg.maxPoints || 100} pts
                      </span>
                    </div>
                    <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{asg.title}</h4>
                    {/* Cleaned markdown preview */}
                    <p className="text-xs text-neutral-500 line-clamp-2">
                      {cleanMarkdown(asg.instructions || asg.description)}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-neutral-200/60 dark:border-neutral-800 flex items-center justify-between text-xs mt-2">
                    <span className="flex items-center gap-1.5 text-neutral-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Due: {formatDate(asg.dueDate || asg.dueAt)}
                    </span>
                    <Link to="/learner/assignments">
                      <Button size="sm" variant="primary">
                        Submit Work 🚀
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
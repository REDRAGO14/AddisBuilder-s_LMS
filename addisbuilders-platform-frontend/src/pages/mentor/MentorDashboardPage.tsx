import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { coursesService } from '../../services/courses.service';
import { assignmentsService } from '../../services/assignments.service';
import { Course, Assignment, AssignmentSubmission } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import {
  BookOpen,
  ClipboardList,
  FileCheck,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Layers,
} from 'lucide-react';

export const MentorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Resilient loading: a 403 on one endpoint (e.g. GET /assignments/submissions
    // for a mentor with mentorStatus = PENDING) must not crash the whole
    // dashboard — degraded sections resolve to empty arrays instead.
    const safe = <T,>(p: Promise<T>): Promise<T | []> => p.catch(() => [] as T | []);
    Promise.all([
      safe(coursesService.getCourses()),
      safe(assignmentsService.getAssignments()),
      safe(assignmentsService.getSubmissions()),
    ]).then(([allCourses, allAsg, allSubs]) => {
      if (isMounted) {
        setCourses(allCourses as Course[]);
        setAssignments(allAsg as Assignment[]);
        setSubmissions(allSubs as AssignmentSubmission[]);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading instructor dashboard..." />;
  }

  const pendingGradingCount = submissions.filter((s) => s.status === 'SUBMITTED').length;
  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudentsCount || 0), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Faculty Dashboard: ${user?.fullName || 'Instructor'}`}
        description="Manage your university courses, review submitted code assignments, and provide graded feedback."
        breadcrumbs={[{ label: 'Mentor', href: '/mentor/dashboard' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex gap-2.5">
            <Link to="/mentor/assignments/new">
              <Button size="sm" variant="outline" leftIcon={<ClipboardList className="w-4 h-4" />}>
                Create Assignment
              </Button>
            </Link>
            <Link to="/mentor/courses/new">
              <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
                Author New Course
              </Button>
            </Link>
          </div>
        }
      />

      {/* Faculty Accreditation Notice Banner if Pending */}
      {user?.mentorStatus === 'PENDING' && (
        <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs text-amber-900">
              <p className="font-bold">Faculty Appointment Verification Pending</p>
              <p className="mt-0.5">
                Your employee ID and appointment documents are being verified by platform administrators. Course authoring and grading permissions will be unlocked upon approval.
              </p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-300 self-start sm:self-center shrink-0">
            Pending Accreditation
          </Badge>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Authored Courses</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{courses.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Enrolled</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{totalStudents}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Pending Review</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{pendingGradingCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Assignments</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{assignments.length}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Managed Courses */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Courses</CardTitle>
            <Link to="/mentor/courses">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Manage
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">{course.title}</h4>
                    <StatusBadge status={course.status} />
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {course.enrolledStudentsCount} students enrolled • {course.materials?.length || 0} materials
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Link to={`/mentor/courses/${course.id}/curriculum`} title="Build curriculum">
                    <Button size="sm" variant="ghost">
                      <Layers className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to={`/mentor/courses/${course.id}/edit`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Submissions awaiting grade */}
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Learner Submissions</CardTitle>
            <Link to="/mentor/submissions">
              <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Grading Desk
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-colors"
              >
                <div className="min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm truncate">
                      {sub.assignmentTitle}
                    </h4>
                    <StatusBadge status={sub.status} />
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    Student: <strong>{sub.studentName}</strong> ({sub.studentEmail})
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Submitted: {formatDate(sub.submittedAt)}
                  </p>
                </div>

                <Link to="/mentor/submissions">
                  <Button size="sm" variant={sub.status === 'SUBMITTED' ? 'primary' : 'outline'}>
                    {sub.status === 'SUBMITTED' ? 'Grade' : 'Review'}
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

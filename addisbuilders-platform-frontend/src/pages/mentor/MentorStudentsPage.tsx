import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { enrollmentsService } from '../../services/enrollments.service';
import { coursesService } from '../../services/courses.service';
import { Enrollment, Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import { getInitials, formatDate } from '../../utils';
import { toast } from 'sonner';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  ChevronRight,
  UserCheck,
} from 'lucide-react';

export const MentorStudentsPage: React.FC = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map to store authoritative progress percentages fetched per course ID
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, { completed: number; total: number; percent: number }>>({});

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Detail Modal
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const instructorId = user?.id || 'user-mentor-1';

  // Helper to extract progress with authoritative fallback support
  const getStudentProgress = (item: any) => {
    const courseId = item.courseId;
    if (courseProgressMap[courseId]) {
      return courseProgressMap[courseId];
    }

    const completed = 
      item.completedLessonsCount ?? 
      item.completedLessons ?? 
      item.lessonsCompleted ?? 
      0;

    const total = 
      item.totalLessonsCount ?? 
      item.totalLessons ?? 
      item.lessonsTotal ?? 
      8;

    const rawProgress = 
      item.progressPercentage ?? 
      item.progress ?? 
      item.completionPercentage ?? 
      (total > 0 ? (completed / total) * 100 : 0);

    return {
      completed,
      total,
      percent: Math.round(rawProgress),
    };
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [allCourses, allEnrollments] = await Promise.all([
        coursesService.getCourses(),
        enrollmentsService.getInstructorStudents(instructorId).catch(() => [] as Enrollment[]),
      ]);

      // Filter courses strictly taught by this instructor
      const instructorCourses = allCourses.filter((c) => c.instructorId === instructorId);
      setCourses(instructorCourses);
      setEnrollments(allEnrollments);

      // Fetch authoritative progress for each unique course/student record in parallel
      const progressMap: Record<string, { completed: number; total: number; percent: number }> = {};
     await Promise.all(
  allEnrollments.map(async (enr) => {
    if (!enr.courseId) return;
    try {
      // Pass the student's ID so the backend calculates progress for the correct student
      const studentIdentifier = (enr as any).studentId || (enr as any).userId;
      const prog = await enrollmentsService.getCourseProgress(enr.courseId, studentIdentifier);
      
      const completed = prog?.completedLessons ?? enr.completedLessonsCount ?? 0;
      const total = prog?.totalLessons ?? enr.totalLessonsCount ?? 8;
      const percent = prog?.completionPercentage ?? (total > 0 ? (completed / total) * 100 : 0);

      progressMap[enr.courseId] = {
        completed,
        total,
        percent: Math.round(percent),
      };
          } catch {
            const completed = enr.completedLessonsCount ?? 0;
            const total = enr.totalLessonsCount ?? 8;
            const percent = enr.progressPercentage ?? (total > 0 ? (completed / total) * 100 : 0);
            progressMap[enr.courseId] = {
              completed,
              total,
              percent: Math.round(percent),
            };
          }
        })
      );
      setCourseProgressMap(progressMap);
    } catch (err: any) {
      setError(err.message || 'Failed to load enrolled students list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [instructorId]);

  // Client-side filtering
  const filteredEnrollments = enrollments.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      (item.studentName && item.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.studentEmail && item.studentEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.courseTitle && item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.studentDepartment && item.studentDepartment.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCourse = selectedCourseId === 'ALL' || item.courseId === selectedCourseId;
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleUpdateStatus = async (newStatus: 'ACTIVE' | 'COMPLETED' | 'DROPPED') => {
    if (!selectedEnrollment) return;
    setUpdatingStatus(true);
    try {
      const updated = await enrollmentsService.updateEnrollmentStatus(selectedEnrollment.id, newStatus);
      setEnrollments((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      setSelectedEnrollment(updated);
      toast.success(`Enrollment marked as ${newStatus}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to update enrollment status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Metrics calculation
  const totalEnrolled = enrollments.length;
  const activeCount = enrollments.filter((e) => e.status === 'ACTIVE').length;
  const completedCount = enrollments.filter((e) => e.status === 'COMPLETED').length;
  const avgProgress =
    totalEnrolled > 0
      ? Math.round(
          enrollments.reduce((acc, curr) => acc + getStudentProgress(curr).percent, 0) / totalEnrolled
        )
      : 0;

  if (loading) {
    return <LoadingSpinner size="lg" label="Retrieving real student enrollments roster..." />;
  }

  if (error) {
    return <ErrorState title="Unable to Load Students" message={error} onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Enrolled Students Roster"
        description="Monitor real-time student progress, review course engagement, and track learning milestones across your assigned courses."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Students' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex border border-neutral-200 dark:border-neutral-800 rounded-lg p-0.5 bg-neutral-100 dark:bg-neutral-800">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'table' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Table view"
                aria-label="Table view"
              >
                <TableIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'grid' ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        }
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Total Enrolled</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{totalEnrolled}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Active Students</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{activeCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Completions</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{completedCount}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4 bg-white dark:bg-neutral-900">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Avg. Progress</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">{avgProgress}%</p>
          </div>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            <div className="sm:col-span-5">
              <SearchInput
                placeholder="Search by student name, email, or department..."
                value={searchQuery}
                onChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            <div className="sm:col-span-4">
              <Select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                options={[
                  { value: 'ALL', label: 'All Instructor Courses' },
                  ...courses.map((c) => ({ value: c.id, label: c.title })),
                ]}
              />
            </div>

            <div className="sm:col-span-3">
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                options={[
                  { value: 'ALL', label: 'All Statuses' },
                  { value: 'ACTIVE', label: 'Active Learners' },
                  { value: 'COMPLETED', label: 'Completed Course' },
                  { value: 'DROPPED', label: 'Dropped' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roster Display */}
      {filteredEnrollments.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="No Students Found"
          description={
            searchQuery || selectedCourseId !== 'ALL' || selectedStatus !== 'ALL'
              ? 'No enrolled student records match your selected criteria. Try adjusting your search query or filters.'
              : 'There are currently no real student enrollments recorded for your courses.'
          }
          action={
            (searchQuery || selectedCourseId !== 'ALL' || selectedStatus !== 'ALL') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCourseId('ALL');
                  setSelectedStatus('ALL');
                }}
              >
                Reset Filters
              </Button>
            )
          }
        />
      ) : viewMode === 'table' ? (
        /* Table View */
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/75 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-4">Course</th>
                  <th className="py-3.5 px-4">Enrollment Date</th>
                  <th className="py-3.5 px-4">Learning Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredEnrollments.map((item) => {
                  const { completed, total, percent } = getStudentProgress(item);

                  return (
                    <tr key={item.id} className="hover:bg-neutral-50/60 transition-colors">
                      {/* Student Info */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          {item.studentAvatarUrl ? (
                            <img
                              src={item.studentAvatarUrl}
                              alt={item.studentName || 'Student'}
                              className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                              {getInitials(item.studentName || 'Student')}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm truncate">
                              {item.studentName || 'Enrolled Student'}
                            </p>
                            <p className="text-neutral-500 text-[11px] truncate">{item.studentEmail || 'No email provided'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1 max-w-xs">
                          {item.courseTitle || 'Course Enrollment'}
                        </p>
                      </td>

                      {/* Enrollment Date */}
                      <td className="py-3.5 px-4 text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
                        {item.enrollmentDate ? formatDate(item.enrollmentDate) : 'Recently'}
                      </td>

                      {/* Progress Bar */}
                      <td className="py-3.5 px-4">
                        <div className="w-36 space-y-1">
                          <div className="flex justify-between text-[11px] text-neutral-500">
                            <span>{completed}/{total} lessons</span>
                            <span className="font-bold text-neutral-800 dark:text-neutral-200">{percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                percent === 100
                                  ? 'bg-emerald-600'
                                  : percent >= 50
                                  ? 'bg-brand-700'
                                  : 'bg-amber-500'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            item.status === 'COMPLETED'
                              ? 'success'
                              : item.status === 'ACTIVE'
                              ? 'brand'
                              : 'neutral'
                          }
                        >
                          {item.status || 'ACTIVE'}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedEnrollment(item)}
                          rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEnrollments.map((item) => {
            const { completed, total, percent } = getStudentProgress(item);

            return (
              <Card key={item.id} className="bg-white dark:bg-neutral-900 p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {item.studentAvatarUrl ? (
                        <img
                          src={item.studentAvatarUrl}
                          alt={item.studentName || 'Student'}
                          className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {getInitials(item.studentName || 'Student')}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{item.studentName || 'Enrolled Student'}</h4>
                        <p className="text-xs text-neutral-500">{item.studentEmail || 'No email provided'}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        item.status === 'COMPLETED'
                          ? 'success'
                          : item.status === 'ACTIVE'
                          ? 'brand'
                          : 'neutral'
                      }
                    >
                      {item.status || 'ACTIVE'}
                    </Badge>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 space-y-1">
                    <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-1">
                      {item.courseTitle || 'Course Enrollment'}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Enrolled: {item.enrollmentDate ? formatDate(item.enrollmentDate) : 'Recently'}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>{completed}/{total} lessons</span>
                      <span className="font-bold text-neutral-800 dark:text-neutral-200">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-700 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <a
                    href={`mailto:${item.studentEmail || ''}`}
                    className="text-xs text-brand-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact
                  </a>
                  <Button size="sm" variant="outline" onClick={() => setSelectedEnrollment(item)}>
                    View Profile
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Student Details Modal */}
      {selectedEnrollment && (
        <Modal
          isOpen={Boolean(selectedEnrollment)}
          onClose={() => setSelectedEnrollment(null)}
          title="Student Enrollment Record"
          size="md"
        >
          {(() => {
            const { completed, total, percent } = getStudentProgress(selectedEnrollment);

            return (
              <div className="space-y-5">
                {/* Header info */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800">
                  {selectedEnrollment.studentAvatarUrl ? (
                    <img
                      src={selectedEnrollment.studentAvatarUrl}
                      alt={selectedEnrollment.studentName || 'Student'}
                      className="w-14 h-14 rounded-full object-cover border border-neutral-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold text-base">
                      {getInitials(selectedEnrollment.studentName || 'Student')}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-base text-neutral-900 dark:text-neutral-100">
                      {selectedEnrollment.studentName || 'Enrolled Student'}
                    </h3>
                    <p className="text-xs text-neutral-500">{selectedEnrollment.studentEmail || 'No email provided'}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={selectedEnrollment.status === 'COMPLETED' ? 'success' : 'brand'}>
                        {selectedEnrollment.status || 'ACTIVE'}
                      </Badge>
                      <span className="text-[11px] text-neutral-400">
                        Enrolled: {selectedEnrollment.enrollmentDate ? formatDate(selectedEnrollment.enrollmentDate) : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course & Progress Details */}
                <div className="space-y-3 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Course Enrollment
                  </h4>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {selectedEnrollment.courseTitle || 'Assigned Course'}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
                      <span>
                        Lessons Completed: {completed} / {total}
                      </span>
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">
                        {percent}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-700 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Status Change Controls for Instructor */}
                <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2">
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block">
                    Update Student Enrollment Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedEnrollment.status === 'ACTIVE' ? 'primary' : 'outline'}
                      disabled={updatingStatus || selectedEnrollment.status === 'ACTIVE'}
                      onClick={() => handleUpdateStatus('ACTIVE')}
                    >
                      Set Active
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedEnrollment.status === 'COMPLETED' ? 'primary' : 'outline'}
                      disabled={updatingStatus || selectedEnrollment.status === 'COMPLETED'}
                      onClick={() => handleUpdateStatus('COMPLETED')}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedEnrollment.status === 'DROPPED' ? 'danger' : 'ghost'}
                      disabled={updatingStatus || selectedEnrollment.status === 'DROPPED'}
                      onClick={() => handleUpdateStatus('DROPPED')}
                    >
                      Drop Student
                    </Button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href={`mailto:${selectedEnrollment.studentEmail || ''}`}
                    className="text-xs text-brand-800 font-semibold hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email to Student
                  </a>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedEnrollment(null)}>
                    Close
                  </Button>
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
};
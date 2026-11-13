import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { curriculumService } from '../../services/curriculum.service';
import { Course, CourseModule, CourseMaterial } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import { CurriculumTree } from '../../components/curriculum/CurriculumTree';
import {
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';
import { getInitials } from '../../utils';
import { toast } from 'sonner';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return;
    let isMounted = true;

    Promise.all([
      coursesService.getCourseById(courseId).catch(() => null),
      curriculumService.getCurriculum(courseId).catch(() => [] as CourseModule[]),
      coursesService.getMaterials(courseId).catch(() => [] as CourseMaterial[]),
    ]).then(([courseData, moduleData, materialData]) => {
      if (isMounted) {
        setCourse(courseData);
        // Prefer the dedicated materials endpoint, fall back to the embedded list.
        setModules(moduleData);
        setMaterials(
          materialData.length > 0 ? materialData : courseData?.materials || []
        );
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in as a student to enroll in this course');
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }

    if (user?.role !== 'LEARNER') {
      toast.error('Only Student / Learner accounts can enroll in courses.');
      return;
    }

    if (!course) return;

    setEnrolling(true);
    try {
      await coursesService.enrollCourse(course.id);
      toast.success(`Successfully enrolled in "${course.title}"!`);
      navigate('/learner/courses');
    } catch (err: any) {
      toast.error(err.message || 'Failed to enroll');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner size="lg" label="Loading course curriculum details..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorState
          title="Course Not Found"
          message="The requested course could not be located. It may have been unpublished or removed."
          onRetry={() => navigate('/courses')}
        />
      </div>
    );
  }

  const objectivesList = Array.isArray(course.learningObjectives)
    ? course.learningObjectives
    : (course.learningObjectives || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/courses"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-brand-800 dark:hover:text-brand-400 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Courses
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="brand">{course.category}</Badge>
              <Badge variant="neutral">{course.level}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-base text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
              {course.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                <Clock className="w-4 h-4 text-brand-700 dark:text-brand-400" />
                Duration: {course.durationWeeks} Weeks
              </span>
              <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                <Users className="w-4 h-4 text-brand-700 dark:text-brand-400" />
                {course.enrolledStudentsCount} Students Enrolled
              </span>
              {totalLessons > 0 && (
                <span className="flex items-center gap-1.5 font-medium text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-brand-700 dark:text-brand-400" />
                  {totalLessons} Lessons across {modules.length}{' '}
                  {modules.length === 1 ? 'Module' : 'Modules'}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">About This Course</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
              {course.description}
            </p>
          </div>

          {/* Learning Objectives */}
          {objectivesList.length > 0 ? (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">What You Will Master</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {objectivesList.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Curriculum Tree — modules → lessons + resources */}
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Course Materials &amp; Modules</h2>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {modules.length > 0
                  ? `${modules.length} ${modules.length === 1 ? 'Module' : 'Modules'} • ${totalLessons} ${totalLessons === 1 ? 'Lesson' : 'Lessons'}`
                  : `${materials.length} Resources Available`}
              </span>
            </div>

            {modules.length > 0 || materials.length > 0 ? (
              <CurriculumTree modules={modules} materials={materials} />
            ) : (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 italic">
                Modules are released progressively throughout the academic semester.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="space-y-6">
          <Card className="shadow-md border-brand-200 dark:border-brand-900/50 bg-white dark:bg-neutral-900 sticky top-24">
            <div className="h-44 overflow-hidden relative">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 space-y-5">
              <div className="text-center">
                <span className="text-2xl font-black text-brand-900 dark:text-brand-300">Free University Access</span>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Accredited by partnering universities</p>
              </div>

              {course.isEnrolled ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-center">
                  <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    You are enrolled in this course
                  </p>
                  <Link to="/learner/courses" className="mt-2 block">
                    <Button variant="primary" size="sm" className="w-full">
                      Open in Student Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleEnroll}
                  isLoading={enrolling}
                >
                  Enroll Now
                </Button>
              )}

              {/* Instructor info card */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                {course.instructorAvatar ? (
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructorName}
                    className="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-brand-800 text-white flex items-center justify-center font-bold">
                    {getInitials(course.instructorName || 'M')}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Instructor</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">{course.instructorName || 'Platform Mentor'}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{course.instructorTitle || 'University Lecturer'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

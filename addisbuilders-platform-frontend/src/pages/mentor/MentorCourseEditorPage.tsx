import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema, CourseFormData } from '../../schemas';
import { coursesService } from '../../services/courses.service';
import { categoriesService } from '../../services/categories.service';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../../constants';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const MentorCourseEditorPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const isEdit = Boolean(courseId && courseId !== 'new');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(isEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: '',
      shortDescription: '',
      description: '',
      category: 'Software Engineering',
      level: 'BEGINNER',
      durationWeeks: 8,
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      learningObjectives: 'Understand core design concepts\nBuild responsive components\nTest with unit tests',
      status: 'PUBLISHED',
    },
  });

  const [dynamicCategories, setDynamicCategories] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    categoriesService
      .getCategories()
      .then((cats) => {
        setDynamicCategories(cats.map((c) => ({ value: c.name, label: c.name })));
      })
      .catch(() => {
        setDynamicCategories(COURSE_CATEGORIES.map((c) => ({ value: c, label: c })));
      });

    if (isEdit && courseId) {
      coursesService
        .getCourseById(courseId)
        .then((course) => {
          const rawObjectives = course.learningObjectives;
          const objectivesStr = Array.isArray(rawObjectives)
            ? rawObjectives.join('\n')
            : typeof rawObjectives === 'string'
            ? rawObjectives
            : '';

          reset({
            title: course.title,
            shortDescription: course.shortDescription,
            description: course.description,
            category: course.category,
            level: course.level,
            durationWeeks: course.durationWeeks,
            thumbnailUrl: course.thumbnailUrl,
            learningObjectives: objectivesStr,
            status: course.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
          });
          setLoading(false);
        })
        .catch(() => {
          toast.error('Could not load course');
          navigate('/mentor/courses');
        });
    }
  }, [isEdit, courseId, reset, navigate]);

  const onSubmit = async (data: CourseFormData) => {
    const objectivesArray = data.learningObjectives
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (isEdit && courseId) {
        await coursesService.updateCourse(courseId, {
          ...data,
          learningObjectives: objectivesArray,
        });
        toast.success('Course updated successfully!');
      } else {
        await coursesService.createCourse({
          ...data,
          learningObjectives: objectivesArray,
          instructorId: user?.id || 'user-mentor-1',
          instructorName: user?.fullName || 'Faculty Instructor',
          instructorTitle: 'Faculty Mentor',
          materials: [],
          status: data.status,
        });
        toast.success('New course authored and published successfully!');
      }
      navigate('/mentor/courses');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save course');
    }
  };

  const categoryOptions = dynamicCategories.length > 0 ? dynamicCategories : COURSE_CATEGORIES.map((c) => ({ value: c, label: c }));
  const levelOptions = COURSE_LEVELS;
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published (Visible to students)' },
    { value: 'DRAFT', label: 'Draft (Private work-in-progress)' },
    { value: 'ARCHIVED', label: 'Archived' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/mentor/courses"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Course List
      </Link>

      <PageHeader
        title={isEdit ? 'Edit Course Curriculum' : 'Author New Course'}
        description="Define curriculum syllabus, learning objectives, duration, and publication status."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'My Courses', href: '/mentor/courses' },
          { label: isEdit ? 'Edit' : 'New Course' },
        ]}
      />

      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Course Title"
              placeholder="e.g. Distributed Cloud Systems with Go & Docker"
              {...register('title')}
              error={errors.title?.message}
              required
            />

            <Input
              label="Short Summary"
              placeholder="A brief 1-2 sentence tagline summarizing the course outcomes..."
              {...register('shortDescription')}
              error={errors.shortDescription?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                {...register('category')}
                error={errors.category?.message}
                required
              />
              <Select
                label="Difficulty Level"
                options={levelOptions}
                {...register('level')}
                error={errors.level?.message}
                required
              />
              <Input
                label="Duration (Weeks)"
                type="number"
                min={1}
                max={52}
                {...register('durationWeeks')}
                error={errors.durationWeeks?.message}
                required
              />
            </div>

            <Textarea
              label="Detailed Course Description & Overview"
              placeholder="Explain the background, weekly modular structure, and prerequisites..."
              rows={5}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <Textarea
              label="Learning Objectives (One per line)"
              placeholder="Architect clean services&#10;Implement relational data models&#10;Write integration test suites"
              rows={4}
              {...register('learningObjectives')}
              error={errors.learningObjectives?.message}
              required
              helperText="Enter each learning outcome on a separate line."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Course Thumbnail Image URL"
                placeholder="https://images.unsplash.com/photo-..."
                {...register('thumbnailUrl')}
                error={errors.thumbnailUrl?.message}
                required
              />
              <Select
                label="Publication Status"
                options={statusOptions}
                {...register('status')}
                error={errors.status?.message}
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/mentor/courses')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                {isEdit ? 'Save Changes' : 'Create & Publish'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

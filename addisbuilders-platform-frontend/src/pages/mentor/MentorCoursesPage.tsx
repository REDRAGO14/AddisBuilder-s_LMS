import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { PlusCircle, Edit, Layers, ExternalLink } from 'lucide-react';

export const MentorCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesService.getCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      render: (course) => (
        <div className="max-w-md">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{course.title}</p>
          <p className="text-xs text-neutral-500 line-clamp-1">{course.shortDescription}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Level',
      render: (course) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{course.category}</Badge>
          <span className="text-[11px] text-neutral-500 font-medium">{course.level}</span>
        </div>
      ),
    },
    {
      key: 'enrolled',
      header: 'Enrolled Students',
      render: (course) => (
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">{course.enrolledStudentsCount} learners</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (course) => <StatusBadge status={course.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (course) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/mentor/courses/${course.id}/curriculum`}>
            <Button size="sm" variant="secondary" leftIcon={<Layers className="w-3.5 h-3.5" />}>
              Curriculum
            </Button>
          </Link>
          <Link to={`/mentor/courses/${course.id}/edit`}>
            <Button size="sm" variant="outline" leftIcon={<Edit className="w-3.5 h-3.5" />}>
              Edit
            </Button>
          </Link>
          <Link to={`/courses/${course.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="Preview public course view">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Management"
        description="Create, revise, and publish academic curricula, lecture materials, and syllabi."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'My Courses' },
        ]}
        actions={
          <Link to="/mentor/courses/new">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle className="w-4 h-4" />}>
              Create Course
            </Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={courses}
        isLoading={loading}
        rowKey={(c) => c.id}
        emptyTitle="No courses created yet"
        emptyDescription="Start authoring your first university-level curriculum for students."
        emptyAction={
          <Link to="/mentor/courses/new">
            <Button size="sm" variant="primary">
              Create New Course
            </Button>
          </Link>
        }
      />
    </div>
  );
};

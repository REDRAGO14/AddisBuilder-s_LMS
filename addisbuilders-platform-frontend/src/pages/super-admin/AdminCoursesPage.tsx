import React, { useState, useEffect } from 'react';
import { coursesService } from '../../services/courses.service';
import { Course } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ExternalLink, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      const list = await coursesService.getCourses();
      setCourses(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleToggleArchive = async (course: Course) => {
    const newStatus = course.status === 'ARCHIVED' ? 'PUBLISHED' : 'ARCHIVED';
    try {
      await coursesService.updateCourse(course.id, { status: newStatus as any });
      toast.success(`Course "${course.title}" status updated to ${newStatus}.`);
      await loadCourses();
    } catch {
      toast.error('Failed to update course status');
    }
  };

  const columns: Column<Course>[] = [
    {
      key: 'title',
      header: 'Course Title',
      render: (c) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{c.title}</p>
          <p className="text-xs text-neutral-500">{c.instructorName}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Level',
      render: (c) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{c.category}</Badge>
          <span className="text-[11px] text-neutral-500 font-medium">{c.level}</span>
        </div>
      ),
    },
    {
      key: 'enrolled',
      header: 'Enrolled Learners',
      render: (c) => <span className="font-bold text-neutral-800 dark:text-neutral-200">{c.enrolledStudentsCount} learners</span>,
    },
    {
      key: 'status',
      header: 'Curriculum Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (c) => (
        <div className="flex items-center justify-end gap-2">
          <Link to={`/courses/${c.id}`} target="_blank">
            <Button size="sm" variant="ghost" title="View Public Course Details">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggleArchive(c)}
            leftIcon={<Archive className="w-3.5 h-3.5" />}
          >
            {c.status === 'ARCHIVED' ? 'Unarchive' : 'Archive'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum & Course Management"
        description="Inspect course content across academic departments, verify syllabus standards, and archive retired curricula."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Courses' },
        ]}
      />

      <DataTable
        columns={columns}
        data={courses}
        isLoading={loading}
        rowKey={(c) => c.id}
        emptyTitle="No courses created yet"
        emptyDescription="Courses created by instructors will appear here."
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { coursesService } from '../../services/courses.service';
import { Course, CourseMaterial, MaterialType } from '../../types';
import { MATERIAL_TYPES } from '../../constants';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, Video, Download, Layers } from 'lucide-react';
import { toast } from 'sonner';

export const MentorMaterialsPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matType, setMatType] = useState<MaterialType>('DOCUMENT');
  const [matUrl, setMatUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    coursesService.getCourses().then((list) => {
      setCourses(list);
      if (list.length > 0) setSelectedCourseId(list[0].id);
      setLoading(false);
    });
  }, []);

  const activeCourse = courses.find((c) => c.id === selectedCourseId);

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !matTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    setSubmitting(true);
    try {
      const updated = await coursesService.addMaterial(selectedCourseId, {
        title: matTitle,
        type: matType,
        url: matUrl || 'https://example.com/material-link.pdf',
        size: '3.5 MB',
      });

      setCourses((prev) =>
        prev.map((c) =>
          c.id === selectedCourseId
            ? { ...c, materials: [...(c.materials || []), updated] }
            : c
        )
      );
      toast.success('Course material uploaded and added to curriculum!');
      setModalOpen(false);
      setMatTitle('');
      setMatUrl('');
    } catch {
      toast.error('Failed to add material');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading curriculum resources..." />;
  }

  const courseOptions = courses.map((c) => ({ value: c.id, label: c.title }));
  // Backend MaterialType: DOCUMENT | VIDEO | LINK | SLIDE | DATASET | OTHER (no 'PDF')
  const typeOptions = MATERIAL_TYPES;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Course Files & Materials"
        description="Static resources attached to the course — slides, documents, datasets, and links. For the structured learning path (modules → lessons), use the Curriculum Builder."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Course Materials' },
        ]}
        actions={
          <div className="flex gap-2.5">
            {selectedCourseId && (
              <Link to={`/mentor/courses/${selectedCourseId}/curriculum`}>
                <Button size="sm" variant="secondary" leftIcon={<Layers className="w-4 h-4" />}>
                  Curriculum Builder
                </Button>
              </Link>
            )}
            <Button
              size="sm"
              variant="primary"
              onClick={() => setModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Upload Material
            </Button>
          </div>
        }
      />

      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
        <label className="text-xs font-semibold uppercase text-neutral-500 shrink-0">
          Select Course Curriculum:
        </label>
        <div className="w-full sm:w-96">
          <Select
            options={courseOptions}
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          />
        </div>
      </div>

      {activeCourse && (
        <Card className="bg-white dark:bg-neutral-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{activeCourse.title}</CardTitle>
              <p className="text-xs text-neutral-500 mt-1">
                {activeCourse.materials?.length || 0} attached educational resources
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {activeCourse.materials && activeCourse.materials.length > 0 ? (
              <div className="space-y-3">
                {activeCourse.materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center">
                        {mat.type === 'VIDEO' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{mat.title}</h4>
                        <p className="text-xs text-neutral-500">
                          {mat.type} • {mat.size || mat.duration || 'Resource'} • Uploaded:{' '}
                          {formatDate(mat.uploadedAt)}
                        </p>
                      </div>
                    </div>

                    <a
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-800 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-neutral-500">
                No materials uploaded yet for this course. Click "Upload Material" to attach slides or lab files.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Upload Material Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Upload Educational Material"
        description={`Target Course: ${activeCourse?.title || ''}`}
      >
        <form onSubmit={handleAddMaterial} className="space-y-4 mt-3">
          <Input
            label="Resource Title"
            placeholder="e.g. Week 4: Relational Normalization & SQL Queries"
            value={matTitle}
            onChange={(e) => setMatTitle(e.target.value)}
            required
          />

          <Select
            label="Resource Type"
            options={typeOptions}
            value={matType}
            onChange={(e) => setMatType(e.target.value as any)}
          />

          <FileUpload
            label="Document / Slide File (PDF, DOCX)"
            purpose="COURSE_MATERIAL"
            onUploadSuccess={(res) => setMatUrl(res.url)}
            helperText="Upload lecture slides or guides for student download."
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Add to Course
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

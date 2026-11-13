import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { assignmentSchema, AssignmentFormData } from '../../schemas';
import { assignmentsService } from '../../services/assignments.service';
import { coursesService } from '../../services/courses.service';
import { Assignment, Course } from '../../types';
import { apiClient } from '../../services/api';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { PlusCircle, ClipboardList, Clock, ArrowRight, Zap, CheckCircle2, FileText, ExternalLink, Edit3, Trash2, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const MentorAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // File upload state for creation & edit forms
  const [uploadingFile, setUploadingFile] = useState(false);
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema) as any,
    defaultValues: {
      totalPoints: 100,
    },
  });

  // Edit form hook
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
    watch: watchEdit,
    formState: { errors: editErrors, isSubmitting: isEditSubmitting },
  } = useForm<AssignmentFormData>({
    resolver: zodResolver(assignmentSchema) as any,
  });

  const currentAttachmentUrl = watch('attachmentUrl');
  const editAttachmentUrl = watchEdit('attachmentUrl');

  const loadData = async () => {
    try {
      const [asgList, courseList] = await Promise.all([
        assignmentsService.getAssignments(),
        coursesService.getCourses(),
      ]);
      setAssignments(asgList);
      setCourses(courseList);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle actual file upload via backend multipart upload service
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'COURSE_MATERIAL');

    try {
      // Calls your backend upload endpoint (e.g. POST /api/uploads or similar)
      const res = await apiClient.post<{ url: string; fileUrl?: string; filePath?: string }>('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const fileUrl = res.data.url || res.data.fileUrl || res.data.filePath || '';
      
      if (isEdit) {
        setEditValue('attachmentUrl', fileUrl, { shouldValidate: true });
      } else {
        setValue('attachmentUrl', fileUrl, { shouldValidate: true });
      }
      setAttachedFileName(file.name);
      toast.success(`Successfully uploaded "${file.name}"! 📎`);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload file. Please try linking a URL instead.');
    } finally {
      setUploadingFile(false);
    }
  };

  const setQuickDueDate = (daysFromNow: number, isEdit = false) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    const formatted = d.toISOString().split('T')[0];
    if (isEdit) {
      setEditValue('dueDate', formatted, { shouldValidate: true });
    } else {
      setValue('dueDate', formatted, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: AssignmentFormData) => {
    const course = courses.find((c) => c.id === data.courseId);
    try {
      await assignmentsService.createAssignment({
        courseId: data.courseId,
        title: data.title,
        description: data.instructions || data.description,
        dueDate: new Date(data.dueDate).toISOString(),
        maxPoints: Number(data.totalPoints || 100),
        attachmentUrl: data.attachmentUrl || undefined,
        courseTitle: course?.title || 'Selected Course',
      });
      toast.success('New coursework assignment published! 🚀');
      setModalOpen(false);
      setAttachedFileName(null);
      reset();
      await loadData();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to publish assignment');
    }
  };

  const handleOpenEdit = (asg: Assignment) => {
    setSelectedAssignment(asg);
    setEditValue('title', asg.title);
    setEditValue('description', asg.description || '');
    setEditValue('instructions', asg.instructions || asg.description || '');
    setEditValue('totalPoints', asg.totalPoints || asg.maxPoints || 100);
    setEditValue('courseId', String(asg.courseId));
    setEditValue('attachmentUrl', asg.attachmentUrl || '');
    if (asg.dueDate) {
      const dateStr = new Date(asg.dueDate).toISOString().split('T')[0];
      setEditValue('dueDate', dateStr);
    }
    setAttachedFileName(asg.attachmentUrl ? 'Attached Resource' : null);
    setEditModalOpen(true);
  };

  const onUpdateSubmit = async (data: AssignmentFormData) => {
    if (!selectedAssignment) return;
    try {
      await assignmentsService.updateAssignment(String(selectedAssignment.id), {
        title: data.title,
        description: data.instructions || data.description,
        maxPoints: Number(data.totalPoints || 100),
        attachmentUrl: data.attachmentUrl || undefined,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
      });
      toast.success('Assignment updated successfully! ✨');
      setEditModalOpen(false);
      setSelectedAssignment(null);
      await loadData();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update assignment');
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this assignment? Student submissions tied to it will be removed.')) return;
    try {
      await assignmentsService.deleteAssignment(String(id));
      toast.success('Assignment deleted successfully.');
      await loadData();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to delete assignment');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coursework assignments..." />;
  }

  const courseOptions = [
    { value: '', label: 'Select Target Course Curriculum' },
    ...courses.map((c) => ({ value: c.id, label: c.title })),
  ];

  const renderMarkdownText = (text?: string) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="font-bold text-neutral-900 dark:text-neutral-100 text-sm mt-3 mb-1">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="font-bold text-neutral-900 dark:text-neutral-100 text-base mt-3 mb-1">{line.replace('## ', '')}</h3>;
      }
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="my-1 leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold text-neutral-900 dark:text-neutral-100">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
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
            <span>Mentor Workspace</span>
            <span>/</span>
            <span className="text-brand-700 font-bold">Coursework Assignments</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              Assessment Management 📝
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Approved Mentor • Active Grading Pipeline
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Design technical problem sets, upload reference kits, set deadlines, and grade student submissions.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="md"
              variant="primary"
              onClick={() => setModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 hover:from-brand-900 hover:to-emerald-800 text-white shadow-md shadow-brand-900/20 border-0 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white dark:bg-neutral-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              Create Assignment 🚀
            </Button>
          </motion.div>
        </div>
      </div>

      {assignments.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <EmptyState
            icon={<ClipboardList className="w-10 h-10 text-brand-600" />}
            title="No Assignments Published Yet"
            description="You haven't created any coursework assignments or technical labs for your students. Publish your first assignment to start receiving student submissions and grading metrics."
            action={
              <Button
                variant="primary"
                size="sm"
                onClick={() => setModalOpen(true)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
              >
                Create Your First Assignment
              </Button>
            }
          />
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {assignments.map((asg, index) => (
            <motion.div
              key={asg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 hover:shadow-md transition-all">
                <CardContent className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-md">
                        {asg.courseTitle}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                        {asg.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs">
                        {asg.totalPoints || asg.maxPoints} pts
                      </span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shadow-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {asg.submissionsCount || 0} Submissions
                      </span>
                      
                      <button
                        onClick={() => handleOpenEdit(asg)}
                        title="Edit Assignment"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-700 hover:bg-neutral-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(asg.id)}
                        title="Delete Assignment"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {asg.attachmentUrl && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 font-medium w-fit">
                      <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="truncate max-w-sm">Reference Material / Starter Kit Attached</span>
                      <a
                        href={asg.attachmentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline ml-2"
                      >
                        View File <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}

                  <div className="bg-neutral-50/80 dark:bg-neutral-800/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
                    <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-brand-800">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Instructions & Rubric
                    </p>
                    <div className="text-neutral-700 dark:text-neutral-300 space-y-1">
                      {renderMarkdownText(asg.instructions || asg.description)}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      Due Date: <strong className="text-neutral-800 dark:text-neutral-200">{formatDate(asg.dueDate)}</strong>
                    </span>

                    <Link to={`/mentor/submissions?assignmentId=${asg.id}`}>
                      <Button size="sm" variant="outline" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        View Submissions & Grade
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Assignment Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Coursework Assignment"
        description="Set assignment instructions, point weighting, due date, and upload reference files."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
          <Select
            label="Target Course"
            options={courseOptions}
            {...register('courseId')}
            error={errors.courseId?.message}
            required
          />

          <Input
            label="Assignment Title"
            placeholder="e.g. Lab 3: Implement JWT Authentication & Password Hashing"
            {...register('title')}
            error={errors.title?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Input
                label="Due Date"
                type="date"
                {...register('dueDate')}
                error={errors.dueDate?.message}
                required
              />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-neutral-400 font-semibold">Quick set:</span>
                <button
                  type="button"
                  onClick={() => setQuickDueDate(3)}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 hover:text-brand-700 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold rounded transition-colors"
                >
                  +3 Days
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDueDate(7)}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 hover:text-brand-700 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold rounded transition-colors"
                >
                  +1 Week
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDueDate(14)}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 hover:text-brand-700 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold rounded transition-colors"
                >
                  +2 Weeks
                </button>
              </div>
            </div>

            <Input
              label="Total Points (Max 100)"
              type="number"
              min={1}
              max={100}
              {...register('totalPoints')}
              error={errors.totalPoints?.message}
              required
            />
          </div>

          {/* Real File Upload Section */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">Reference Material / Starter Kit (PDF, Zip)</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 text-xs font-bold border border-neutral-300 transition-colors shadow-xs">
                <Upload className="w-4 h-4 text-brand-700" />
                {uploadingFile ? 'Uploading file...' : 'Choose File to Upload'}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, false)}
                  accept=".pdf,.zip,.docx,.rar,.txt,.md"
                />
              </label>
              {attachedFileName && (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium">
                  <FileText className="w-3.5 h-3.5" /> {attachedFileName}
                  <button
                    type="button"
                    onClick={() => {
                      setAttachedFileName(null);
                      setValue('attachmentUrl', '');
                    }}
                    className="text-neutral-400 hover:text-rose-600 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>
            {currentAttachmentUrl && !attachedFileName && (
              <p className="text-[11px] text-neutral-500 truncate">
                Current URL: <a href={currentAttachmentUrl} target="_blank" rel="noreferrer" className="text-brand-700 underline">{currentAttachmentUrl}</a>
              </p>
            )}
          </div>

          <Textarea
            label="Detailed Assignment Instructions & Rubric (Markdown Supported)"
            placeholder="### Objective&#10;Describe goals here...&#10;&#10;### Deliverables&#10;1. **Requirement 1:** Details..."
            rows={6}
            {...register('instructions')}
            error={errors.instructions?.message}
            required
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting || uploadingFile}>
              Publish Assignment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Assignment Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Coursework Assignment"
        description="Update instructions, points, deadlines, or attachments."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmitEdit(onUpdateSubmit)} className="space-y-4 mt-3">
          <Input
            label="Assignment Title"
            {...registerEdit('title')}
            error={editErrors.title?.message}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Input
                label="Due Date"
                type="date"
                {...registerEdit('dueDate')}
                error={editErrors.dueDate?.message}
                required
              />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-neutral-400 font-semibold">Quick set:</span>
                <button
                  type="button"
                  onClick={() => setQuickDueDate(3, true)}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold rounded"
                >
                  +3 Days
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDueDate(7, true)}
                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 text-neutral-600 dark:text-neutral-400 text-[10px] font-bold rounded"
                >
                  +1 Week
                </button>
              </div>
            </div>

            <Input
              label="Total Points"
              type="number"
              min={1}
              max={100}
              {...registerEdit('totalPoints')}
              error={editErrors.totalPoints?.message}
              required
            />
          </div>

          {/* Edit File Upload Section */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">Reference Material / Starter Kit (PDF, Zip)</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 text-xs font-bold border border-neutral-300 transition-colors shadow-xs">
                <Upload className="w-4 h-4 text-brand-700" />
                {uploadingFile ? 'Uploading file...' : 'Upload New File'}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, true)}
                  accept=".pdf,.zip,.docx,.rar,.txt,.md"
                />
              </label>
              {editAttachmentUrl && (
                <span className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg font-medium truncate max-w-xs">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{editAttachmentUrl.split('/').pop() || 'Attached File'}</span>
                </span>
              )}
            </div>
          </div>

          <Textarea
            label="Detailed Assignment Instructions & Rubric"
            rows={6}
            {...registerEdit('instructions')}
            error={editErrors.instructions?.message}
            required
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isEditSubmitting || uploadingFile}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};
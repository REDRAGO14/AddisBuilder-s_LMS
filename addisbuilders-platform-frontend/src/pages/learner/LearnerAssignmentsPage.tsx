import React, { useState, useEffect, useMemo, useRef } from 'react';
import { assignmentsService } from '../../services/assignments.service';
import { coursesService } from '../../services/courses.service';
import { Assignment, AssignmentSubmission, Course } from '../../types';
import { apiClient } from '../../services/api';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate, apiErrorMessage } from '../../utils';
import { ClipboardList, Clock, CheckCircle2, Award, Send, FileText, Download, Upload, X, Zap, ChevronDown, Search, Filter, Check, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const LearnerAssignmentsPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Status Tab Category: 'PENDING' | 'SUBMITTED' | 'GRADED'
  const [activeTab, setActiveTab] = useState<'PENDING' | 'SUBMITTED' | 'GRADED'>('PENDING');

  // Search & Course Dropdown Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ALL');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // UI Toggles
  const [expandedInstructionsIds, setExpandedInstructionsIds] = useState<Record<string, boolean>>({});
  const [expandedSubmissionIds, setExpandedSubmissionIds] = useState<Record<string, boolean>>({});

  // Submission Modal state
  const [selectedAsg, setSelectedAsg] = useState<Assignment | null>(null);
  const [submissionContent, setSubmissionContent] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState<string | number | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadData = async () => {
    try {
      const [allAsg, mySubs, allCourses] = await Promise.all([
        assignmentsService.getAssignments(),
        assignmentsService.getMySubmissions(),
        coursesService.getCourses().catch(() => [] as Course[]),
      ]);
      setAssignments(allAsg);
      setSubmissions(mySubs);
      setCourses(allCourses);
    } catch (err: any) {
      toast.error(apiErrorMessage(err, 'Failed to load assignments'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getSubmissionForAsg = (asgId: string | number) => {
    return submissions.find((s) => String(s.assignmentId) === String(asgId));
  };

  const toggleInstructions = (id: string | number) => {
    setExpandedInstructionsIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubmissionView = (id: string | number) => {
    setExpandedSubmissionIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSecureDownload = async (fileUrlOrPath: string, asgId: string | number) => {
    if (!fileUrlOrPath) return;
    setDownloadingFileId(asgId);
    try {
      let endpoint = fileUrlOrPath;
      if (fileUrlOrPath.startsWith('http')) {
        const urlObj = new URL(fileUrlOrPath);
        endpoint = urlObj.pathname;
      }
      const response = await apiClient.get(endpoint, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileUrlOrPath.split('/').pop() || 'assignment-material');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.success('File downloaded successfully! 📥');
    } catch {
      toast.error('Failed to download file securely. Opening directly.');
      window.open(fileUrlOrPath, '_blank');
    } finally {
      setDownloadingFileId(null);
    }
  };

  const categorizedAssignments = useMemo(() => {
    const pending: Assignment[] = [];
    const submitted: Assignment[] = [];
    const graded: Assignment[] = [];

    assignments.forEach((asg) => {
      const sub = getSubmissionForAsg(asg.id);
      if (!sub) {
        pending.push(asg);
      } else if (sub.status === 'GRADED') {
        graded.push(asg);
      } else {
        submitted.push(asg);
      }
    });

    return { pending, submitted, graded };
  }, [assignments, submissions]);

  const currentTabList = useMemo(() => {
    const list = categorizedAssignments[activeTab.toLowerCase() as keyof typeof categorizedAssignments] || [];
    return list.filter((a) => {
      const matchesCourse = selectedCourseId === 'ALL' || String(a.courseId) === String(selectedCourseId);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        a.title.toLowerCase().includes(query) ||
        (a.courseTitle && a.courseTitle.toLowerCase().includes(query)) ||
        (a.instructions && a.instructions.toLowerCase().includes(query));
      return matchesCourse && matchesSearch;
    });
  }, [categorizedAssignments, activeTab, selectedCourseId, searchQuery]);

  const selectedCourseTitle = useMemo(() => {
    if (selectedCourseId === 'ALL') return 'All Courses & Tracks';
    const found = courses.find((c) => String(c.id) === String(selectedCourseId));
    return found?.title || 'Selected Course';
  }, [selectedCourseId, courses]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'ASSIGNMENT_SUBMISSION');

    try {
      const res = await apiClient.post<{ url: string; fileUrl?: string; filePath?: string }>('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const uploadedUrl = res.data.url || res.data.fileUrl || res.data.filePath || '';
      setFileUrl(uploadedUrl);
      setFileName(file.name);
      toast.success(`Attached "${file.name}" successfully! 📎`);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg) return;

    if (!submissionContent.trim() && !fileUrl) {
      toast.error('Please provide solution notes or attach a submission file.');
      return;
    }

    setSubmitting(true);
    try {
      await assignmentsService.submitAssignment({
        assignmentId: String(selectedAsg.id),
        assignmentTitle: selectedAsg.title,
        courseId: String(selectedAsg.courseId),
        courseTitle: selectedAsg.courseTitle,
        textAnswer: submissionContent,
        fileUrl: fileUrl || undefined,
      });

      toast.success('Assignment submitted successfully! 🚀');
      setSelectedAsg(null);
      setSubmissionContent('');
      setFileUrl('');
      setFileName(null);
      await loadData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading coursework assignments..." />;
  }

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
            <span>Learner Workspace</span>
            <span>/</span>
            <span className="text-brand-700 font-bold">Coursework Assignments</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
              Coursework & Labs 📋
            </h1>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-bold border border-brand-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Active Enrollee • Submission Portal
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
            Review assigned problem sets, submit deliverables, and view mentor grading and critique in real-time.
          </p>
        </div>
      </div>

      {/* Categorized Interactive Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'PENDING'
              ? 'bg-brand-700 text-white shadow-md shadow-brand-700/20'
              : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Pending Work
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'PENDING' ? 'bg-brand-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {categorizedAssignments.pending.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('SUBMITTED')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'SUBMITTED'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          In Review / Submitted
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'SUBMITTED' ? 'bg-amber-700 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {categorizedAssignments.submitted.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('GRADED')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'GRADED'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          Graded & Completed
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'GRADED' ? 'bg-emerald-700 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {categorizedAssignments.graded.length}
          </span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search assignments by title or requirements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative w-full sm:w-72 shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-xs hover:border-brand-300 transition-all"
          >
            <div className="flex items-center gap-2 truncate">
              <Filter className="w-3.5 h-3.5 text-brand-700 shrink-0" />
              <span className="truncate">{selectedCourseTitle}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 left-0 sm:left-auto sm:right-0 sm:w-80 mt-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl z-50 overflow-hidden py-1.5"
              >
                <div className="px-3 py-2 border-b border-neutral-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Filter by Curriculum</p>
                </div>
                <div className="max-h-64 overflow-y-auto p-1">
                  <button
                    onClick={() => {
                      setSelectedCourseId('ALL');
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      selectedCourseId === 'ALL' ? 'bg-brand-50 text-brand-800' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <span>All Courses & Tracks</span>
                    {selectedCourseId === 'ALL' && <Check className="w-3.5 h-3.5 text-brand-700" />}
                  </button>
                  {courses.map((c) => {
                    const isSelected = String(selectedCourseId) === String(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCourseId(String(c.id));
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          isSelected ? 'bg-brand-50 text-brand-800' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="truncate pr-2">{c.title}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {currentTabList.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="w-10 h-10 text-brand-600" />}
          title={`No ${activeTab.toLowerCase()} assignments`}
          description={`You have no assignments currently categorized under ${activeTab.toLowerCase()}.`}
        />
      ) : (
        <div className="space-y-4">
          {currentTabList.map((asg, index) => {
            const sub = getSubmissionForAsg(asg.id);
            const totalPts = asg.totalPoints || asg.maxPoints || 100;
            const isInstructionsExpanded = !!expandedInstructionsIds[asg.id];
            const isSubmissionExpanded = !!expandedSubmissionIds[asg.id];
            const rawText = asg.instructions || asg.description || '';
            const isGraded = sub?.status === 'GRADED';

            return (
              <motion.div
                key={asg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
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

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs">
                          Max: {totalPts} pts
                        </span>
                        {sub ? <StatusBadge status={sub.status} /> : <StatusBadge status="PENDING" />}
                      </div>
                    </div>

                    {asg.attachmentUrl && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 font-medium w-fit">
                        <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="truncate max-w-sm">Starter Kit / Reference Material</span>
                        <button
                          onClick={() => handleSecureDownload(asg.attachmentUrl!, asg.id)}
                          disabled={downloadingFileId === asg.id}
                          className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:underline ml-2 bg-white dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-indigo-200 shadow-xs transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          {downloadingFileId === asg.id ? 'Downloading...' : 'Download File'}
                        </button>
                      </div>
                    )}

                    {/* Instructions Accordion */}
                    <div className="bg-neutral-50/80 dark:bg-neutral-800/60 p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5 text-xs uppercase tracking-wider text-brand-800">
                          <Zap className="w-3.5 h-3.5 text-amber-500" /> Instructions & Requirements Summary
                        </span>
                        <button
                          onClick={() => toggleInstructions(asg.id)}
                          className="text-xs font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 bg-white dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-brand-200 shadow-xs transition-colors"
                        >
                          {isInstructionsExpanded ? (
                            <>Show Less <ChevronDown className="w-3.5 h-3.5 rotate-180" /></>
                          ) : (
                            <>Read Full Instructions <ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>
                      </div>

                      <AnimatePresence>
                        {isInstructionsExpanded ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-neutral-700 dark:text-neutral-300 space-y-1 pt-2 border-t border-neutral-200/60 dark:border-neutral-800"
                          >
                            {renderMarkdownText(rawText)}
                          </motion.div>
                        ) : (
                          <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                            {rawText.replace(/###\s+/g, '').replace(/##\s+/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                          </p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submission / Graded Box */}
                    {sub ? (
                      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Submitted on {formatDate(sub.submittedAt)}
                          </span>

                          <div className="flex items-center gap-2">
                            {sub.grade !== undefined && sub.grade !== null && (
                              <span className="text-xs font-black text-emerald-800 bg-white dark:bg-neutral-900 px-3 py-1 rounded-lg border border-emerald-300 shadow-xs">
                                Grade: {sub.grade} / {totalPts}
                              </span>
                            )}

                            {/* View Submission Toggle */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleSubmissionView(asg.id)}
                              leftIcon={isSubmissionExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            >
                              {isSubmissionExpanded ? 'Hide Solution' : 'View My Submission'}
                            </Button>

                            {/* NOTE: Update button is hidden for GRADED assignments to prevent modifying finalized scores */}
                          </div>
                        </div>

                        {/* Collapsible Submission Solution Box */}
                        <AnimatePresence>
                          {isSubmissionExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 leading-relaxed space-y-2 pt-3"
                            >
                              <p className="font-bold text-neutral-900 dark:text-neutral-100">Your Submitted Solution:</p>
                              <p className="whitespace-pre-line text-neutral-600 dark:text-neutral-400">{sub.content || sub.textAnswer}</p>
                              {sub.fileUrl && (
                                <button
                                  onClick={() => handleSecureDownload(sub.fileUrl!, asg.id)}
                                  className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:underline pt-1 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200 mt-2"
                                >
                                  <FileText className="w-3.5 h-3.5" /> Download Submitted File <Download className="w-3 h-3" />
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {sub.feedback && (
                          <div className="p-3.5 bg-white dark:bg-neutral-900 rounded-xl border border-brand-200 text-xs text-neutral-800 dark:text-neutral-200 space-y-1 shadow-xs">
                            <p className="font-bold text-brand-900 flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-brand-700" />
                              Mentor Feedback & Critique:
                            </p>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{sub.feedback}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100">
                        <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          Due Date: <strong className="text-neutral-800 dark:text-neutral-200">{formatDate(asg.dueDate || asg.dueAt)}</strong>
                        </span>

                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            setSelectedAsg(asg);
                            setSubmissionContent('');
                            setFileUrl('');
                            setFileName(null);
                          }}
                          leftIcon={<Send className="w-4 h-4" />}
                        >
                          Submit Work 🚀
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Submission Modal */}
      {selectedAsg && (
        <Modal
          isOpen={!!selectedAsg}
          onClose={() => setSelectedAsg(null)}
          title={`Submit Assignment: ${selectedAsg.title}`}
          description={`Course: ${selectedAsg.courseTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSubmitWork} className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <span><strong>Deadline:</strong> {formatDate(selectedAsg.dueDate || selectedAsg.dueAt)}</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">Total Points: {selectedAsg.totalPoints || selectedAsg.maxPoints} pts</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300">Attach Solution File (Optional Code Zip, PDF)</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-700 dark:text-neutral-300 text-xs font-bold border border-neutral-300 transition-colors shadow-xs">
                  <Upload className="w-4 h-4 text-brand-700" />
                  {uploading ? 'Uploading...' : 'Choose File'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".zip,.pdf,.rar,.docx,.txt,.js,.java,.ts"
                  />
                </label>
                {fileName && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium">
                    <FileText className="w-3.5 h-3.5" /> {fileName}
                    <button
                      type="button"
                      onClick={() => {
                        setFileName(null);
                        setFileUrl('');
                      }}
                      className="text-neutral-400 hover:text-rose-600 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>

            <Textarea
              label="Solution Explanation, Architectural Notes & Repository URL"
              placeholder="Provide repository link (GitHub/GitLab) and a brief overview of your implementation..."
              rows={6}
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              required
              helperText="Provide your write-up or repository links."
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedAsg(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={submitting || uploading}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Assignment 🚀
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};
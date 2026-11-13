import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { assignmentsService } from '../../services/assignments.service';
import { coursesService } from '../../services/courses.service';
import { AssignmentSubmission, Course } from '../../types';
import { apiClient } from '../../services/api';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { Award, FileCheck, CheckCircle2, User, Clock, Search, Filter, ChevronDown, Check, X, FileText, Download, Eye, EyeOff, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export const MentorSubmissionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlAssignmentId = searchParams.get('assignmentId');

  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Status Tab: 'PENDING' | 'GRADED' | 'ALL'
  const [activeTab, setActiveTab] = useState<'PENDING' | 'GRADED' | 'ALL'>('PENDING');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ALL');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Collapsible solution viewer state
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  // Grading Modal state
  const [gradingSub, setGradingSub] = useState<AssignmentSubmission | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(95);
  const [feedbackInput, setFeedbackInput] = useState<string>('');
  const [savingGrade, setSavingGrade] = useState(false);
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
      const [list, courseList] = await Promise.all([
        assignmentsService.getSubmissions(),
        coursesService.getCourses().catch(() => [] as Course[]),
      ]);
      setSubmissions(list);
      setCourses(courseList);
    } catch (err: any) {
      toast.error(
        err?.response?.status === 403
          ? 'Grading access requires mentor approval by platform administrators.'
          : 'Failed to load student submissions'
      );
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleSolutionView = (id: string | number) => {
    setExpandedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSecureDownload = async (fileUrlOrPath: string, subId: string | number) => {
    if (!fileUrlOrPath) return;
    setDownloadingFileId(subId);
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
      link.setAttribute('download', fileUrlOrPath.split('/').pop() || 'student-submission');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
      toast.success('Student file downloaded successfully! 📥');
    } catch {
      toast.error('Failed to download file securely. Opening directly.');
      window.open(fileUrlOrPath, '_blank');
    } finally {
      setDownloadingFileId(null);
    }
  };

  const categorized = useMemo(() => {
    const needsGrading: AssignmentSubmission[] = [];
    const graded: AssignmentSubmission[] = [];

    submissions.forEach((sub) => {
      if (urlAssignmentId && String(sub.assignmentId) !== String(urlAssignmentId)) {
        return;
      }
      if (sub.status === 'GRADED') {
        graded.push(sub);
      } else {
        needsGrading.push(sub);
      }
    });

    return { needsGrading, graded, all: submissions };
  }, [submissions, urlAssignmentId]);

  const currentList = useMemo(() => {
    let baseList = categorized.needsGrading;
    if (activeTab === 'GRADED') baseList = categorized.graded;
    if (activeTab === 'ALL') {
      baseList = urlAssignmentId
        ? submissions.filter((s) => String(s.assignmentId) === String(urlAssignmentId))
        : submissions;
    }

    return baseList.filter((sub) => {
      const matchesCourse = selectedCourseId === 'ALL' || String(sub.courseId) === String(selectedCourseId);
      const query = searchQuery.toLowerCase();
      const studentName = sub.studentName || (sub as any).studentFullName || (sub as any).userName || 'Enrolled Student';
      const studentEmail = sub.studentEmail || (sub as any).email || '';
      const matchesSearch =
        !query ||
        studentName.toLowerCase().includes(query) ||
        studentEmail.toLowerCase().includes(query) ||
        sub.assignmentTitle.toLowerCase().includes(query) ||
        (sub.content && sub.content.toLowerCase().includes(query));
      return matchesCourse && matchesSearch;
    });
  }, [categorized, activeTab, searchQuery, selectedCourseId, submissions, urlAssignmentId]);

  const selectedCourseTitle = useMemo(() => {
    if (selectedCourseId === 'ALL') return 'All Courses & Curriculums';
    const found = courses.find((c) => String(c.id) === String(selectedCourseId));
    return found?.title || 'Selected Course';
  }, [selectedCourseId, courses]);

  const handleOpenGrading = (sub: AssignmentSubmission) => {
    setGradingSub(sub);
    setGradeInput(sub.grade !== undefined && sub.grade !== null ? sub.grade : 95);
    setFeedbackInput(sub.feedback || 'Great solution! Clear architecture, robust error handling, and clean code structure.');
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;

    if (gradeInput < 0 || gradeInput > 100) {
      toast.error('Grade must be between 0 and 100');
      return;
    }

    setSavingGrade(true);
    try {
      const studentName = gradingSub.studentName || (gradingSub as any).studentFullName || 'Student';
      await assignmentsService.gradeSubmission(gradingSub.id, gradeInput, feedbackInput);
      toast.success(`Evaluation saved for ${studentName}! 🎉`);
      setGradingSub(null);
      await loadData();
    } catch {
      toast.error('Failed to save grade');
    } finally {
      setSavingGrade(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading student submissions..." />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }} 
      className="space-y-8 pb-20"
    >
      <PageHeader
        title="Student Submissions & Grading Desk 📝"
        description="Review submitted code solutions, test suites, and provide constructive academic feedback."
        breadcrumbs={[
          { label: 'Mentor', href: '/mentor/dashboard' },
          { label: 'Submissions' },
        ]}
      />

      {urlAssignmentId && (
        <div className="flex items-center justify-between p-3.5 bg-brand-50 rounded-2xl border border-brand-200 text-xs text-brand-900">
          <span className="font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            Showing submissions filtered for assignment ID: <strong className="font-bold">{urlAssignmentId}</strong>
          </span>
          <Button size="sm" variant="ghost" onClick={() => setSearchParams({})}>
            Clear Filter ✕
          </Button>
        </div>
      )}

      {/* Categorized Tabs */}
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
          Needs Evaluation
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'PENDING' ? 'bg-brand-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {categorized.needsGrading.length}
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
          <CheckCircle2 className="w-3.5 h-3.5" />
          Evaluated & Graded
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'GRADED' ? 'bg-emerald-700 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {categorized.graded.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 ${
            activeTab === 'ALL'
              ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/20'
              : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          All Submissions
          <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeTab === 'ALL' ? 'bg-neutral-800 text-white' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'}`}>
            {submissions.length}
          </span>
        </button>
      </div>

      {/* Search & Course Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by student name, email, assignment title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200/80 dark:border-neutral-800 text-xs font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-xs transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
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
                    <span>All Courses & Curriculums</span>
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

      {currentList.length === 0 ? (
        <EmptyState
          icon={<FileCheck className="w-10 h-10 text-brand-600" />}
          title={`No ${activeTab.toLowerCase()} submissions`}
          description="There are no student submissions matching your current filter criteria."
        />
      ) : (
        <div className="space-y-4">
          {currentList.map((sub, index) => {
            const isSolutionExpanded = !!expandedSolutions[sub.id];
            // Fallback student name parser across different property naming schemas
            const studentName = sub.studentName || (sub as any).studentFullName || (sub as any).userName || 'Enrolled Student';
            const studentEmail = sub.studentEmail || (sub as any).email || 'student@addisbuilder.edu';

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-brand-300 hover:shadow-md transition-all">
                  <CardContent className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold text-brand-800 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded-md">
                          {sub.courseTitle}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-2">
                          {sub.assignmentTitle}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {sub.grade !== undefined && sub.grade !== null && (
                          <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 shadow-xs">
                            Score: {sub.grade}/100
                          </span>
                        )}
                        <StatusBadge status={sub.status} />
                      </div>
                    </div>

                    {/* Prominent Student Identity Badge Bar */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-700 dark:text-neutral-300 bg-brand-50/60 p-3.5 rounded-xl border border-brand-100">
                      <div className="flex items-center gap-2 font-bold text-brand-900 dark:text-brand-200">
                        {sub.studentAvatarUrl || sub.learnerAvatarUrl ? (
                          <img
                            src={sub.studentAvatarUrl || sub.learnerAvatarUrl}
                            alt={studentName}
                            className="w-7 h-7 rounded-full object-cover border border-brand-200 dark:border-brand-800 shadow-xs"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-brand-700 text-white flex items-center justify-center text-xs font-black shadow-xs">
                            {studentName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span>{studentName}</span>
                      </div>
                      <span className="text-brand-300">•</span>
                      <span className="flex items-center gap-1 text-brand-800 font-medium">
                        <Mail className="w-3.5 h-3.5 text-brand-600" />
                        {studentEmail}
                      </span>
                      <span className="text-brand-300">•</span>
                      <span className="flex items-center gap-1 text-neutral-500 font-medium ml-auto">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        Submitted: {formatDate(sub.submittedAt)}
                      </span>
                    </div>

                    {/* Solution Viewer Toggle */}
                    <div className="flex items-center justify-between pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleSolutionView(sub.id)}
                        leftIcon={isSolutionExpanded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      >
                        {isSolutionExpanded ? 'Hide Student Solution' : 'View Student Solution'}
                      </Button>

                      <Button
                        size="sm"
                        variant={sub.status === 'SUBMITTED' ? 'primary' : 'outline'}
                        onClick={() => handleOpenGrading(sub)}
                        leftIcon={<Award className="w-4 h-4" />}
                      >
                        {sub.status === 'SUBMITTED' ? 'Grade Submission 📝' : 'Update Evaluation 🔄'}
                      </Button>
                    </div>

                    {/* Collapsible Solution Content */}
                    <AnimatePresence>
                      {isSolutionExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-neutral-50/80 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 space-y-2 pt-3"
                        >
                          <p className="font-bold text-neutral-900 dark:text-neutral-100">Student Solution Notes & Links:</p>
                          <p className="leading-relaxed whitespace-pre-line text-neutral-700 dark:text-neutral-300">{sub.content || sub.textAnswer}</p>
                          
                          {sub.fileUrl && (
                            <button
                              onClick={() => handleSecureDownload(sub.fileUrl!, sub.id)}
                              disabled={downloadingFileId === sub.id}
                              className="inline-flex items-center gap-1.5 font-bold text-indigo-700 hover:underline pt-1 bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-lg border border-indigo-200 shadow-xs mt-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-indigo-600" />
                              {downloadingFileId === sub.id ? 'Downloading...' : 'Download Student Attachment'}
                              <Download className="w-3 h-3 ml-1" />
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {sub.feedback && (
                      <div className="p-3.5 bg-brand-50/50 rounded-xl border border-brand-200 text-xs text-brand-900 space-y-1 shadow-xs">
                        <p className="font-bold flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-brand-700" /> Graded Feedback & Critique:
                        </p>
                        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{sub.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Grading Modal */}
      {gradingSub && (
        <Modal
          isOpen={!!gradingSub}
          onClose={() => setGradingSub(null)}
          title={`Evaluate Submission: ${gradingSub.studentName || 'Student'}`}
          description={`Assignment: ${gradingSub.assignmentTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveGrade} className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl text-xs text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 space-y-1">
              <p className="font-bold text-neutral-900 dark:text-neutral-100">Student Solution Quick Preview:</p>
              <p className="line-clamp-3 text-neutral-700 dark:text-neutral-300">{gradingSub.content || gradingSub.textAnswer}</p>
            </div>

            <Input
              label="Assigned Score (0 - 100)"
              type="number"
              min={0}
              max={100}
              value={gradeInput}
              onChange={(e) => setGradeInput(Number(e.target.value))}
              required
            />

            <Textarea
              label="Constructive Feedback & Notes for Student"
              placeholder="Highlight strengths, architecture advice, and areas for improvement..."
              rows={5}
              value={feedbackInput}
              onChange={(e) => setFeedbackInput(e.target.value)}
              required
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setGradingSub(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={savingGrade}>
                Save Evaluation 🚀
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </motion.div>
  );
};
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { internshipsService } from '../../services/internships.service';
import { applicationsService } from '../../services/applications.service';
import { Internship } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorState } from '../../components/feedback/ErrorState';
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { formatDate } from '../../utils';
import { toast } from 'sonner';

export const InternshipDetailPage: React.FC = () => {
  const { internshipId } = useParams<{ internshipId: string }>();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!internshipId) return;
    internshipsService
      .getInternshipById(internshipId)
      .then((data) => {
        setInternship(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [internshipId]);

  const handleToggleSave = async () => {
    if (!isAuthenticated) {
      toast.info('Please sign in to save this internship');
      return;
    }
    if (!internship) return;
    try {
      const res = await internshipsService.toggleSave(internship.id);
      setInternship((prev) => (prev ? { ...prev, isSaved: res.isSaved } : null));
      toast.success(res.isSaved ? 'Saved to your dashboard' : 'Removed from saved internships');
    } catch {
      toast.error('Failed to update saved status');
    }
  };

  const handleOpenApplyModal = () => {
    if (!isAuthenticated) {
      toast.info('Please sign in as a student to apply for internships.');
      navigate('/login', { state: { from: `/internships/${internshipId}` } });
      return;
    }

    if (user?.role !== 'LEARNER') {
      toast.error('Only registered Students / Learners can submit internship applications.');
      return;
    }

    setApplyModalOpen(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internship) return;

    if (!coverLetter.trim() || coverLetter.length < 30) {
      setValidationError('Please provide a cover letter of at least 30 characters highlighting your skills.');
      return;
    }

    setValidationError('');
    setSubmitting(true);

    try {
      await applicationsService.apply({
        internshipId: internship.id,
        internshipTitle: internship.title,
        organizationName: internship.organizationName,
        coverLetter,
        cvUrl: cvUrl || user?.cvUrl,
      });

      setInternship((prev) => (prev ? { ...prev, hasApplied: true, applicantsCount: (prev.applicantsCount ?? 0) + 1 } : null));
      setApplyModalOpen(false);
      toast.success('Your application has been submitted successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <LoadingSpinner size="lg" label="Loading internship specifications..." />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ErrorState
          title="Internship Not Found"
          message="The requested listing does not exist or may have reached its application deadline."
          onRetry={() => navigate('/internships')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        to="/internships"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Internships
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="brand">{internship.category}</Badge>
                <Badge variant="neutral">{internship.workMode}</Badge>
              </div>

              <button
                onClick={handleToggleSave}
                className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-brand-800 p-2 rounded-lg hover:bg-neutral-50 border border-neutral-200 dark:border-neutral-800 transition-colors"
              >
                {internship.isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-brand-800 fill-brand-100" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {internship.title}
            </h1>

            <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
              <Building2 className="w-4 h-4" />
              <span>{internship.organizationName}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-400" />
                <span>{internship.durationMonths} Months Duration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Deadline: {formatDate(internship.deadline)}</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Opportunity Overview</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {(() => {
            const respList = Array.isArray(internship.responsibilities)
              ? internship.responsibilities
              : (internship.responsibilities || '')
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean);

            return respList.length > 0 ? (
              <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Key Responsibilities</h2>
                <ul className="space-y-2.5">
                  {respList.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-700 shrink-0 mt-2" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
          })()}

          {/* Requirements & Qualifications */}
          {(() => {
            const reqList = Array.isArray(internship.requirements)
              ? internship.requirements
              : (internship.requirements || '')
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean);

            return reqList.length > 0 ? (
              <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Candidate Requirements</h2>
                <ul className="space-y-2.5">
                  {reqList.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
          })()}

          {/* Eligibility */}
          <div className="bg-brand-50/50 p-6 rounded-2xl border border-brand-200/80 space-y-2">
            <h3 className="text-sm font-bold text-brand-900">University Eligibility Criteria</h3>
            <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">{internship.eligibility}</p>
          </div>
        </div>

        {/* Sidebar Call To Action */}
        <div className="space-y-6">
          <Card className="shadow-md border-brand-200 bg-white dark:bg-neutral-900 sticky top-24">
            <CardContent className="p-6 space-y-5">
              {internship.stipend && (
                <div className="text-center p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Compensation</p>
                  <p className="text-lg font-bold text-emerald-800 mt-0.5">{internship.stipend}</p>
                </div>
              )}

              <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Application Deadline:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{formatDate(internship.deadline)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Work Arrangement:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{internship.workMode}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100">
                  <span>Total Applicants:</span>
                  <span className="font-semibold text-neutral-900 dark:text-neutral-100">{internship.applicantsCount}</span>
                </div>
              </div>

              {internship.hasApplied ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Application Submitted
                  </p>
                  <Link to="/learner/applications" className="mt-2 block">
                    <Button variant="primary" size="sm" className="w-full">
                      Track Application Status
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleOpenApplyModal}
                  leftIcon={<Send className="w-4 h-4" />}
                >
                  Apply for Internship
                </Button>
              )}

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-neutral-500 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Employer Opportunity</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        title={`Apply to ${internship.title}`}
        description={`Organization: ${internship.organizationName}`}
        maxWidth="lg"
      >
        <form onSubmit={handleApplySubmit} className="space-y-5 mt-4">
          <div className="bg-neutral-50 dark:bg-neutral-800/60 p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
            <p>
              <strong className="text-neutral-900 dark:text-neutral-100">Applicant:</strong> {user?.fullName} ({user?.email})
            </p>
            {user?.university && (
              <p>
                <strong className="text-neutral-900 dark:text-neutral-100">Institution:</strong> {user.university} - {user.department}
              </p>
            )}
          </div>

          <Textarea
            label="Cover Letter / Statement of Interest"
            placeholder="Explain why you are an ideal fit for this internship, your technical coursework, and what you aim to achieve..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={5}
            required
            helperText="Minimum 30 characters."
            error={validationError}
          />

          <FileUpload
            label="Resume / Curriculum Vitae (PDF)"
            purpose="CV"
            accept=".pdf,.doc,.docx"
            onUploadSuccess={(res) => setCvUrl(res.url)}
            currentFileName={user?.cvUrl ? 'Default Profile CV' : undefined}
            helperText="Upload an updated resume or use your profile CV."
          />

          <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setApplyModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

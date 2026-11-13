import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication, ApplicationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate } from '../../utils';
import { FileCheck, Download, UserCheck, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerApplicantsPage: React.FC = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('SUBMITTED');
  const [statusNotes, setStatusNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadData = async () => {
    try {
      const data = await applicationsService.getApplications();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenReview = (app: InternshipApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setStatusNotes(app.notes || '');
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setUpdating(true);
    try {
      await applicationsService.updateStatus(selectedApp.id, newStatus, statusNotes);
      toast.success(`Application status updated to ${newStatus}`);
      setSelectedApp(null);
      await loadData();
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const columns: Column<InternshipApplication>[] = [
    {
      key: 'applicant',
      header: 'Candidate Name & Email',
      render: (app) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{app.applicantName}</p>
          <p className="text-xs text-neutral-500">{app.applicantEmail}</p>
          {app.university && (
            <p className="text-[11px] text-brand-800 font-medium mt-0.5">
              {app.university} - {app.department}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'internshipTitle',
      header: 'Applied Position',
      render: (app) => (
        <span className="font-medium text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm">
          {app.internshipTitle}
        </span>
      ),
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      render: (app) => <span className="text-xs text-neutral-600 dark:text-neutral-400">{formatDate(app.appliedAt)}</span>,
    },
    {
      key: 'status',
      header: 'Recruitment Stage',
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (app) => (
        <Button size="sm" variant="outline" onClick={() => handleOpenReview(app)}>
          Review Candidate
        </Button>
      ),
    },
  ];

  // Backend ApplicationStatus values (spec §4) — 'PENDING'/'REVIEWING' are legacy
  // mock values the backend rejects with 400.
  const statusOptions = [
    { value: 'SUBMITTED', label: 'Pending Review' },
    { value: 'UNDER_REVIEW', label: 'Under Review' },
    { value: 'SHORTLISTED', label: 'Shortlisted' },
    { value: 'INTERVIEW_SCHEDULED', label: 'Interview Scheduled' },
    { value: 'ACCEPTED', label: 'Accepted (Offer Extended)' },
    { value: 'DECLINED', label: 'Declined by Candidate' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Review Pipeline"
        description="Evaluate candidate qualifications, inspect submitted cover letters and CVs, and advance recruitment stages."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Applicants' },
        ]}
      />

      <DataTable
        columns={columns}
        data={applications}
        isLoading={loading}
        rowKey={(a) => a.id}
        emptyTitle="No candidates applied yet"
        emptyDescription="Applications for your published corporate internships will appear here."
      />

      {/* Candidate Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Review Candidate: ${selectedApp.applicantName}`}
          description={`Position: ${selectedApp.internshipTitle}`}
          maxWidth="lg"
        >
          <form onSubmit={handleSaveStatus} className="space-y-4 mt-3">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedApp.applicantEmail}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedApp.applicantPhone || 'No phone supplied'}</span>
              </div>
              <div className="sm:col-span-2 pt-1 border-t border-neutral-200 dark:border-neutral-800">
                <p>
                  <strong>University / Department:</strong> {selectedApp.university || 'Enrolled Student'}{' '}
                  ({selectedApp.department || 'N/A'})
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                Candidate Cover Letter
              </p>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            {selectedApp.cvUrl && (
              <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200 flex items-center justify-between text-xs text-brand-900">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-brand-700" />
                  <span>{selectedApp.cvFileName || 'Candidate_Resume.pdf'}</span>
                </div>
                <a
                  href={selectedApp.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline flex items-center gap-1 hover:text-brand-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  Open Document
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 pt-2">
              <Select
                label="Recruitment Pipeline Stage"
                options={statusOptions}
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
              />

              <Textarea
                label="Recruitment Notes / Feedback for Candidate"
                placeholder="Optional notes or interview invitation instructions..."
                rows={3}
                value={statusNotes}
                onChange={(e) => setStatusNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={updating}>
                Save Candidate Status
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

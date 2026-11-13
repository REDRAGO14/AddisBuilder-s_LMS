import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication, ApplicationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Select } from '../../components/ui/Select';
import { formatDate } from '../../utils';
import { FileCheck, ExternalLink, User } from 'lucide-react';
import { toast } from 'sonner';

export const CoordinatorApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);
  const [statusInput, setStatusInput] = useState<ApplicationStatus>('SUBMITTED');

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
    setStatusInput(app.status);
  };

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;
    try {
      await applicationsService.updateStatus(selectedApp.id, statusInput);
      toast.success('Applicant placement status updated');
      setSelectedApp(null);
      await loadData();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const columns: Column<InternshipApplication>[] = [
    {
      key: 'student',
      header: 'Applicant',
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
      key: 'internship',
      header: 'Internship Role',
      render: (app) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{app.internshipTitle}</p>
          <p className="text-xs text-neutral-500">{app.organizationName}</p>
        </div>
      ),
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      render: (app) => <span className="text-xs text-neutral-600 dark:text-neutral-400">{formatDate(app.appliedAt)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
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
    { value: 'ACCEPTED', label: 'Accepted' },
    { value: 'DECLINED', label: 'Declined by Candidate' },
    { value: 'REJECTED', label: 'Rejected' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Placement Applications"
        description="Monitor student submissions, evaluate resume credentials, and verify institutional endorsements."
        breadcrumbs={[
          { label: 'Coordinator', href: '/internship-manager/dashboard' },
          { label: 'Applications' },
        ]}
      />

      <DataTable
        columns={columns}
        data={applications}
        isLoading={loading}
        rowKey={(a) => a.id}
        emptyTitle="No applications submitted yet"
        emptyDescription="Student applications for your institutional listings will appear here."
      />

      {/* Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Candidate: ${selectedApp.applicantName}`}
          description={`Target Position: ${selectedApp.internshipTitle}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
              <p>
                <strong>Email:</strong> {selectedApp.applicantEmail} • <strong>Phone:</strong>{' '}
                {selectedApp.applicantPhone || '—'}
              </p>
              <p>
                <strong>University:</strong> {selectedApp.university || 'Enrolled Student'} (
                {selectedApp.department || 'N/A'})
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Cover Letter
              </p>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            <Select
              label="Update Placement Status"
              options={statusOptions}
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value as any)}
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button type="button" variant="outline" onClick={() => setSelectedApp(null)}>
                Cancel
              </Button>
              <Button type="button" variant="primary" onClick={handleUpdateStatus}>
                Save Decision
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

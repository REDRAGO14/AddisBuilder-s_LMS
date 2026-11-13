import React, { useState, useEffect } from 'react';
import { applicationsService } from '../../services/applications.service';
import { InternshipApplication } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate, apiErrorMessage } from '../../utils';
import { FileText, Building2, Calendar, FileCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearnerApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<InternshipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<InternshipApplication | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Learner applications live at GET /internships/applications/my.
    // GET /applications?applicantId= is admin-only per spec §6.13.
    applicationsService
      .getMyApplications()
      .then((data) => {
        if (!cancelled) {
          setApplications(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(apiErrorMessage(err, 'Failed to load your applications'));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading application tracking logs..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Internship Applications"
        description="Track your real-time recruitment progression with corporate partners and coordinators."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Applications' },
        ]}
        actions={
          <Link to="/learner/internships">
            <Button size="sm" variant="primary">
              Apply to More Roles
            </Button>
          </Link>
        }
      />

      {applications.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-8 h-8" />}
          title="No Applications Submitted"
          description="Explore open internship postings and submit your application to accelerate your career."
          action={
            <Link to="/learner/internships">
              <Button size="sm" variant="primary">
                Find Internships
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <Card key={app.id} className="bg-white dark:bg-neutral-900 hover:border-brand-300 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 dark:text-neutral-100 text-base">{app.internshipTitle}</span>
                    <StatusBadge status={app.status} />
                  </div>

                  <p className="text-xs font-semibold text-brand-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {app.organizationName}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      Applied: {formatDate(app.appliedAt)}
                    </span>
                    {app.cvFileName && (
                      <span className="flex items-center gap-1 text-neutral-600 dark:text-neutral-400">
                        <FileCheck className="w-3.5 h-3.5 text-brand-700" />
                        {app.cvFileName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApp(app)}
                  >
                    View Submission
                  </Button>
                  <Link to={`/internships/${app.internshipId}`}>
                    <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Listing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application: ${selectedApp.internshipTitle}`}
          description={`Employer: ${selectedApp.organizationName}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <span className="text-xs text-neutral-600 dark:text-neutral-400">Current Recruitment Stage:</span>
              <StatusBadge status={selectedApp.status} />
            </div>

            {selectedApp.notes && (
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
                <p className="font-bold">Employer Status Note:</p>
                <p>{selectedApp.notes}</p>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                Submitted Cover Letter
              </p>
              <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
                {selectedApp.coverLetter}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { mentorsService } from '../../services/mentors.service';
import { MentorRequest, ApprovalStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { EmptyState } from '../../components/feedback/EmptyState';
import { formatDate } from '../../utils';
import { toast } from 'sonner';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  FileText,
  Building2,
  UserCheck,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';

export const AdminMentorApprovalsPage: React.FC = () => {
  const [requests, setRequests] = useState<MentorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReq, setSelectedReq] = useState<MentorRequest | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  const loadRequests = async () => {
    try {
      const data = await mentorsService.getAdminRequests();
      setRequests(data);
    } catch {
      toast.error('Failed to load faculty mentor requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDecision = async (status: ApprovalStatus) => {
    if (!selectedReq) return;
    setProcessing(true);
    try {
      await mentorsService.decideRequest(selectedReq.id, status, decisionNotes);
      toast.success(
        `Faculty application for ${selectedReq.fullName} marked as ${status}.`
      );
      setSelectedReq(null);
      setDecisionNotes('');
      await loadRequests();
    } catch {
      toast.error('Failed to record accreditation decision');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading faculty mentor accreditation applications..." />;
  }

  const pending = requests.filter((r) => r.status === 'PENDING');
  const reviewed = requests.filter((r) => r.status !== 'PENDING');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Faculty Mentor Accreditation"
        description="Verify university faculty appointments, employee credentials, and institutional proof documents before granting course authoring and grading permissions."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Mentor Approvals' },
        ]}
      />

      {/* Pending Queue */}
      <Card className="bg-white dark:bg-neutral-900 overflow-hidden shadow-xs border border-neutral-200 dark:border-neutral-800">
        <CardHeader className="p-5 border-b border-neutral-100 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-700" />
            Pending Faculty Applications ({pending.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {pending.length === 0 ? (
            <div className="py-10">
              <EmptyState
                icon={<CheckCircle2 className="w-10 h-10 text-emerald-500" />}
                title="No Pending Faculty Applications"
                description="All academic mentor applications have been reviewed and accredited."
              />
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {pending.map((req) => (
                <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">{req.fullName}</span>
                      <StatusBadge status="PENDING" />
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                      {req.university} • {req.department}
                    </p>
                    <p className="text-xs text-neutral-500">
                      Email: <span className="text-neutral-800 dark:text-neutral-200">{req.email}</span> | Employee ID:{' '}
                      <span className="font-mono text-neutral-800 dark:text-neutral-200 font-semibold">{req.employeeId}</span>
                    </p>
                    {req.proofDocumentUrl && (
                      <a
                        href={req.proofDocumentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand-700 font-semibold hover:underline mt-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Inspect Faculty Appointment Proof
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="primary"
                      leftIcon={<CheckCircle2 className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedReq(req);
                        setDecisionNotes('Academic credentials and university employee ID verified.');
                      }}
                    >
                      Review & Decide
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Previously Reviewed History */}
      {reviewed.length > 0 && (
        <Card className="bg-white dark:bg-neutral-900 overflow-hidden shadow-xs border border-neutral-200 dark:border-neutral-800">
          <CardHeader className="p-5 border-b border-neutral-100">
            <CardTitle className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
              Accreditation History ({reviewed.length})
            </CardTitle>
          </CardHeader>
          <div className="divide-y divide-neutral-100">
            {reviewed.map((req) => (
              <div key={req.id} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{req.fullName}</span>
                  <span className="text-neutral-500 ml-2">({req.university})</span>
                  {req.decisionNotes && (
                    <p className="text-neutral-500 text-[11px] mt-0.5">Notes: {req.decisionNotes}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400">{formatDate(req.decisionDate || req.requestDate)}</span>
                  <StatusBadge status={req.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Decision Modal */}
      {selectedReq && (
        <Modal
          isOpen={!!selectedReq}
          onClose={() => setSelectedReq(null)}
          title={`Accreditation Decision: ${selectedReq.fullName}`}
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-800 text-xs space-y-1">
              <p><span className="text-neutral-500">Institution:</span> <strong className="text-neutral-900 dark:text-neutral-100">{selectedReq.university}</strong></p>
              <p><span className="text-neutral-500">Department:</span> <strong className="text-neutral-900 dark:text-neutral-100">{selectedReq.department}</strong></p>
              <p><span className="text-neutral-500">Employee ID:</span> <strong className="text-neutral-900 dark:text-neutral-100 font-mono">{selectedReq.employeeId}</strong></p>
            </div>

            <Textarea
              label="Evaluation Notes & Comments"
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
              placeholder="e.g. Faculty ID and appointment document validated against university directory."
              rows={3}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => handleDecision('REJECTED')}
                isLoading={processing}
                className="text-rose-700 hover:bg-rose-50"
              >
                Reject Application
              </Button>
              <Button
                variant="primary"
                onClick={() => handleDecision('APPROVED')}
                isLoading={processing}
              >
                Approve & Grant Faculty Access
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

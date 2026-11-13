import React, { useState, useEffect } from 'react';
import { coordinatorsService } from '../../services/coordinators.service';
import { CoordinatorRequest, ApprovalStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate } from '../../utils';
import { GraduationCap, CheckCircle2, XCircle, AlertTriangle, FileText } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCoordinatorApprovalsPage: React.FC = () => {
  const [requests, setRequests] = useState<CoordinatorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeReq, setActiveReq] = useState<CoordinatorRequest | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadRequests = async () => {
    try {
      const data = await coordinatorsService.getAdminRequests();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleDecision = async (decision: ApprovalStatus) => {
    if (!activeReq) return;
    setSubmitting(true);
    try {
      await coordinatorsService.decideRequest(activeReq.id, decision, decisionNotes);
      toast.success(
        `Coordinator request for ${activeReq.fullName} was marked as ${decision}.`
      );
      setActiveReq(null);
      setDecisionNotes('');
      await loadRequests();
    } catch {
      toast.error('Failed to submit decision');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<CoordinatorRequest>[] = [
    {
      key: 'name',
      header: 'Coordinator & University',
      render: (r) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{r.fullName}</p>
          <p className="text-xs text-brand-800 font-medium">{r.university} - {r.department}</p>
          <p className="text-[11px] text-neutral-400">Employee ID: {r.employeeId}</p>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Institutional Email',
      render: (r) => <span className="text-xs text-neutral-700 dark:text-neutral-300">{r.email}</span>,
    },
    {
      key: 'requestDate',
      header: 'Request Date',
      render: (r) => <span className="text-xs text-neutral-600 dark:text-neutral-400">{formatDate(r.requestDate)}</span>,
    },
    {
      key: 'status',
      header: 'Review Status',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (r) => (
        <Button size="sm" variant="outline" onClick={() => setActiveReq(r)}>
          {r.status === 'PENDING' ? 'Review & Decide' : 'Update Status'}
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Coordinator Verifications"
        description="Verify academic employment credentials and authorize university career linkage representatives."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Coordinator Approvals' },
        ]}
      />

      <DataTable
        columns={columns}
        data={requests}
        isLoading={loading}
        rowKey={(r) => r.id}
        emptyTitle="No coordinator requests found"
        emptyDescription="Submitted coordinator requests will appear here for administrative adjudication."
      />

      {/* Decision Modal */}
      {activeReq && (
        <Modal
          isOpen={!!activeReq}
          onClose={() => setActiveReq(null)}
          title={`Adjudicate Coordinator: ${activeReq.fullName}`}
          description={`Institution: ${activeReq.university}`}
          maxWidth="md"
        >
          <div className="space-y-4 mt-3">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 space-y-1">
              <p><strong>Department:</strong> {activeReq.department}</p>
              <p><strong>Employee / Staff ID:</strong> {activeReq.employeeId}</p>
              <p><strong>Email Address:</strong> {activeReq.email}</p>
              <p><strong>Application Date:</strong> {formatDate(activeReq.requestDate)}</p>
            </div>

            <Textarea
              label="Administrative Decision Notes"
              placeholder="State verification audit notes, staff badge confirmation, or reason for rejection..."
              rows={3}
              value={decisionNotes}
              onChange={(e) => setDecisionNotes(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-100 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveReq(null)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDecision('REJECTED')}
                disabled={submitting}
                leftIcon={<XCircle className="w-4 h-4" />}
              >
                Reject Request
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDecision('APPROVED')}
                disabled={submitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve Coordinator
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

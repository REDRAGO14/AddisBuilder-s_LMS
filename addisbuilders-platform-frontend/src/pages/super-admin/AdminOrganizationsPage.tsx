import React, { useState, useEffect } from 'react';
import { organizationsService } from '../../services/organizations.service';
import { Organization, VerificationStatus } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { formatDate, apiErrorMessage } from '../../utils';
import { Building2, CheckCircle2, XCircle, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export const AdminOrganizationsPage: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const list = await organizationsService.getAllOrganizationsAdmin();
      setOrganizations(list);
    } catch (err: any) {
      toast.error(apiErrorMessage(err, 'Failed to load organizations'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDecision = async (status: VerificationStatus) => {
    if (!selectedOrg) return;
    setSubmitting(true);
    try {
      await organizationsService.decideVerificationAdmin(String(selectedOrg.id), status, notes);
      toast.success(`Organization ${selectedOrg.name} marked as ${status}!`);
      setSelectedOrg(null);
      setNotes('');
      await loadData();
    } catch {
      toast.error('Failed to submit decision');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Organization>[] = [
    {
      key: 'name',
      header: 'Organization Name & Industry',
      render: (o) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{o.name}</p>
          <p className="text-xs text-neutral-500">{o.industry}</p>
        </div>
      ),
    },
    {
      key: 'registration',
      header: 'License / TIN',
      render: (o) => (
        <div className="text-xs text-neutral-700 dark:text-neutral-300">
          <p>Lic: <span className="font-mono">{o.registrationNumber || 'Pending'}</span></p>
          <p>TIN: <span className="font-mono">{o.taxId || 'Pending'}</span></p>
        </div>
      ),
    },
    {
      key: 'location',
      header: 'Location & Website',
      render: (o) => (
        <div className="text-xs text-neutral-700 dark:text-neutral-300">
          <p>{o.location}</p>
          <a
            href={o.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-800 underline truncate max-w-[150px] block"
          >
            {o.website}
          </a>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Verification Status',
      render: (o) => <StatusBadge status={o.verificationStatus} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (o) => (
        <Button size="sm" variant="outline" onClick={() => setSelectedOrg(o)}>
          Inspect & Verify
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employer Verification & Compliance"
        description="Audit corporate registration documents, tax certificates, and grant authorized employer badges."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Organizations' },
        ]}
      />

      <DataTable
        columns={columns}
        data={organizations}
        isLoading={loading}
        rowKey={(o) => o.id}
        emptyTitle="No organizations registered"
        emptyDescription="Registered employers will appear here for verification auditing."
      />

      {/* Review Modal */}
      {selectedOrg && (
        <Modal
          isOpen={!!selectedOrg}
          onClose={() => setSelectedOrg(null)}
          title={`Verify: ${selectedOrg.name}`}
          description={`Industry: ${selectedOrg.industry}`}
          maxWidth="lg"
        >
          <div className="space-y-4 mt-3">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 grid grid-cols-2 gap-2">
              <p><strong>License:</strong> {selectedOrg.registrationNumber || 'N/A'}</p>
              <p><strong>TIN:</strong> {selectedOrg.taxId || 'N/A'}</p>
              <p><strong>Contact Email:</strong> {selectedOrg.contactEmail}</p>
              <p><strong>Phone:</strong> {selectedOrg.contactPhone}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2">
                Attached Compliance Documents
              </p>
              <div className="space-y-2">
                {selectedOrg.documents?.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-800 dark:text-neutral-200"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-700" />
                      <span>{d.name}</span>
                    </div>
                    <span className="text-[11px] text-neutral-500">Verified Proof</span>
                  </div>
                ))}
              </div>
            </div>

            <Textarea
              label="Administrative Decision Notes"
              placeholder="Record verification review results..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-neutral-100 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrg(null)}
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
                Reject Verification
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleDecision('APPROVED')}
                disabled={submitting}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Approve & Grant Verified Status
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

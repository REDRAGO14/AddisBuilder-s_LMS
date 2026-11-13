import React, { useState, useEffect } from 'react';
import { internshipsService } from '../../services/internships.service';
import { Internship } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { formatDate, apiErrorMessage } from '../../utils';
import { ShieldCheck, AlertTriangle, Eye, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export const AdminModerationPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemToClose, setItemToClose] = useState<Internship | null>(null);

  const loadData = async () => {
    try {
      // Admin moderation needs ALL listings (incl. DRAFT/REJECTED):
      // GET /internships/admin — the public catalogue only returns PUBLISHED.
      const list = await internshipsService.getAllInternshipsAdmin();
      setInternships(list);
    } catch (err: any) {
      toast.error(apiErrorMessage(err, 'Failed to load listings'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCloseListing = async () => {
    if (!itemToClose) return;
    try {
      // Canonical close route: POST /internships/listings/{id}/close
      await internshipsService.closeInternship(itemToClose.id);
      toast.success(`Internship "${itemToClose.title}" has been closed.`);
      setItemToClose(null);
      await loadData();
    } catch {
      toast.error('Failed to close internship');
    }
  };

  const columns: Column<Internship>[] = [
    {
      key: 'title',
      header: 'Listing & Poster',
      render: (i) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{i.title}</p>
          <p className="text-xs text-brand-800 font-medium">Org: {i.organizationName}</p>
          <p className="text-[11px] text-neutral-400">Posted By Role: {i.postedByRole}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category & Mode',
      render: (i) => (
        <div className="flex flex-col gap-1">
          <Badge variant="brand">{i.category}</Badge>
          <span className="text-[11px] text-neutral-500">{i.workMode}</span>
        </div>
      ),
    },
    {
      key: 'applicants',
      header: 'Applicants',
      render: (i) => <span className="font-bold text-neutral-800 dark:text-neutral-200">{i.applicantsCount} candidates</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (i) => <StatusBadge status={i.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (i) => (
        <div className="flex items-center justify-end gap-2">
          {i.status !== 'CLOSED' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setItemToClose(i)}
              leftIcon={<XCircle className="w-3.5 h-3.5 text-red-500" />}
            >
              Close Listing
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Internship Listing Moderation"
        description="Audit, oversee, and moderate public internship opportunities to maintain academic safety and compliance."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Moderation' },
        ]}
      />

      <DataTable
        columns={columns}
        data={internships}
        isLoading={loading}
        rowKey={(i) => i.id}
        emptyTitle="No listings found"
        emptyDescription="Internship postings will appear here for moderation."
      />

      {itemToClose && (
        <ConfirmDialog
          isOpen={!!itemToClose}
          onClose={() => setItemToClose(null)}
          onConfirm={handleCloseListing}
          title="Close Internship Opportunity"
          message={`Are you sure you want to close "${itemToClose.title}"? Students will no longer be able to submit applications.`}
          variant="danger"
          confirmLabel="Close Listing"
        />
      )}
    </div>
  );
};

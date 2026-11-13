import React, { useState, useEffect } from 'react';
import { reportsService } from '../../services/reports.service';
import { AuditLog } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { formatDateTime } from '../../utils';
import { ShieldAlert, FileCheck, Terminal } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reportsService.getAuditLogs().then((data) => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  const columns: Column<AuditLog>[] = [
    {
      key: 'actor',
      header: 'Actor & Role',
      render: (log) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{log.actorName}</p>
          <Badge variant="neutral" className="mt-0.5 text-[10px]">
            {log.actorRole}
          </Badge>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (log) => (
        <span className="font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
          {log.action}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Audit Description & Target',
      render: (log) => (
        <div className="max-w-md">
          <p className="text-xs text-neutral-800 dark:text-neutral-200">{log.details}</p>
          <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
            {log.targetType} ({log.targetId})
          </p>
        </div>
      ),
    },
    {
      key: 'timestamp',
      header: 'Timestamp (UTC)',
      render: (log) => <span className="text-xs text-neutral-500">{formatDateTime(log.timestamp)}</span>,
    },
    {
      key: 'ip',
      header: 'IP Address',
      render: (log) => (
        <span className="font-mono text-xs text-neutral-500">{log.ipAddress || '197.156.104.22'}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security & System Audit Logs"
        description="Immutable chronological audit trail recording sensitive administrative decisions, approvals, and actions."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Audit Logs' },
        ]}
      />

      <DataTable
        columns={columns}
        data={logs}
        isLoading={loading}
        rowKey={(l) => l.id}
        emptyTitle="No audit events found"
        emptyDescription="Platform events and state changes will appear in this audit log."
      />
    </div>
  );
};

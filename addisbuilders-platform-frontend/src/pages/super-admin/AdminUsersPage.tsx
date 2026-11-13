import React, { useState, useEffect } from 'react';
import { usersService } from '../../services/users.service';
import { User, UserRole } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { DataTable, Column } from '../../components/ui/DataTable';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SearchInput } from '../../components/ui/SearchInput';
import { Select } from '../../components/ui/Select';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Modal } from '../../components/ui/Modal';
import { formatDate } from '../../utils';
import { USER_ROLES } from '../../constants';
import { UserX, UserCheck, ShieldAlert, Eye } from 'lucide-react';
import { toast } from 'sonner';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  const [userToView, setUserToView] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadUsers = async () => {
    try {
      const data = await usersService.getAllUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleConfirmToggle = async () => {
    if (!userToToggle) return;
    setIsUpdating(true);
    try {
      await usersService.toggleUserActive(userToToggle.id);
      toast.success(
        `Account for ${userToToggle.fullName} is now ${userToToggle.isActive ? 'deactivated' : 'activated'}.`
      );
      setUserToToggle(null);
      await loadUsers();
    } catch {
      toast.error('Failed to change user status');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns: Column<User>[] = [
    {
      key: 'user',
      header: 'Full Name & Email',
      render: (u) => (
        <div>
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{u.fullName}</p>
          <p className="text-xs text-neutral-500">{u.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (u) => <Badge variant="neutral">{USER_ROLES[u.role]?.label || u.role}</Badge>,
    },
    {
      key: 'affiliation',
      header: 'Institution / Entity',
      render: (u) => (
        <span className="text-xs text-neutral-700 dark:text-neutral-300">
          {u.university || (u.role === 'EMPLOYER' ? 'Partner Organization' : 'General Platform')}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Registered',
      render: (u) => <span className="text-xs text-neutral-500">{formatDate(u.createdAt)}</span>,
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (u) => <StatusBadge status={u.isActive ? 'ACTIVE' : 'INACTIVE'} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'text-right',
      render: (u) => (
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setUserToView(u)} title="View profile details">
            <Eye className="w-4 h-4 text-neutral-500" />
          </Button>
          <Button
            size="sm"
            variant={u.isActive ? 'outline' : 'primary'}
            onClick={() => setUserToToggle(u)}
            leftIcon={u.isActive ? <UserX className="w-3.5 h-3.5 text-red-500" /> : <UserCheck className="w-3.5 h-3.5" />}
          >
            {u.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: 'All', label: 'All Roles' },
    { value: 'LEARNER', label: 'Learners' },
    { value: 'MENTOR', label: 'Mentors' },
    { value: 'INTERNSHIP_COORDINATOR', label: 'Coordinators' },
    { value: 'EMPLOYER', label: 'Employers' },
    { value: 'SUPER_ADMIN', label: 'Super Admins' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Account Management"
        description="Inspect registered learners, instructors, coordinators, and corporate accounts."
        breadcrumbs={[
          { label: 'Admin', href: '/super-admin/dashboard' },
          { label: 'Users' },
        ]}
      />

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200/90 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by user name or email..."
          className="max-w-md w-full"
        />

        <div className="w-full sm:w-56">
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        isLoading={loading}
        rowKey={(u) => u.id}
        emptyTitle="No matching users found"
        emptyDescription="Try clearing your search query or role filter."
      />

      {/* Confirmation Dialog for Sensitive Administrative Action */}
      {userToToggle && (
        <ConfirmDialog
          isOpen={!!userToToggle}
          onClose={() => setUserToToggle(null)}
          onConfirm={handleConfirmToggle}
          title={userToToggle.isActive ? 'Deactivate Account' : 'Activate Account'}
          message={`Are you sure you want to ${
            userToToggle.isActive ? 'suspend access for' : 're-activate'
          } ${userToToggle.fullName} (${userToToggle.email})?`}
          variant={userToToggle.isActive ? 'danger' : 'primary'}
          confirmLabel={userToToggle.isActive ? 'Yes, Deactivate' : 'Yes, Activate'}
          isLoading={isUpdating}
        />
      )}

      {/* User Details View Modal */}
      {userToView && (
        <Modal
          isOpen={!!userToView}
          onClose={() => setUserToView(null)}
          title={`User Dossier: ${userToView.fullName}`}
          description={`ID: ${userToView.id}`}
        >
          <div className="space-y-3 mt-3 text-xs text-neutral-700 dark:text-neutral-300">
            <div className="p-3 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1">
              <p><strong>Email:</strong> {userToView.email}</p>
              <p><strong>Phone:</strong> {userToView.phone || 'N/A'}</p>
              <p><strong>Role:</strong> {USER_ROLES[userToView.role]?.label}</p>
              <p><strong>Account Status:</strong> {userToView.isActive ? 'Active' : 'Deactivated'}</p>
              <p><strong>Registered Date:</strong> {formatDate(userToView.createdAt)}</p>
            </div>

            {userToView.university && (
              <div className="p-3 bg-brand-50/50 rounded-xl border border-brand-200 space-y-1">
                <p><strong>University:</strong> {userToView.university}</p>
                <p><strong>Department:</strong> {userToView.department || 'N/A'}</p>
                {userToView.studentId && <p><strong>Student ID:</strong> {userToView.studentId}</p>}
                {userToView.coordinatorStatus && (
                  <p><strong>Coordinator Approval:</strong> {userToView.coordinatorStatus}</p>
                )}
              </div>
            )}

            {userToView.bio && (
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Biography:</p>
                <p className="p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">{userToView.bio}</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setUserToView(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

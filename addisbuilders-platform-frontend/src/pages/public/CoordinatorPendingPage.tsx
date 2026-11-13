import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { coordinatorsService } from '../../services/coordinators.service';
import { ApprovalStatus } from '../../types';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Clock, AlertTriangle, ShieldCheck, RefreshCw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CoordinatorPendingPage: React.FC = () => {
  const { user, logout, updateCurrentUser } = useAuth();
  const [status, setStatus] = useState<ApprovalStatus>(user?.coordinatorStatus || 'PENDING');
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const checkStatus = async () => {
    setChecking(true);
    try {
      const res = await coordinatorsService.getMyStatus();
      setStatus(res.status);
      updateCurrentUser({ coordinatorStatus: res.status });
      if (res.status === 'APPROVED') {
        toast.success('Congratulations! Your coordinator authorization has been approved.');
        navigate('/internship-manager/dashboard');
      } else {
        toast.info(`Current status: ${res.status}`);
      }
    } catch {
      toast.error('Failed to check approval status');
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-sm text-center">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
            status === 'PENDING'
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              : status === 'REJECTED'
              ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
              : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {status === 'PENDING' ? (
            <Clock className="w-8 h-8 animate-pulse" />
          ) : status === 'REJECTED' ? (
            <AlertTriangle className="w-8 h-8" />
          ) : (
            <ShieldCheck className="w-8 h-8" />
          )}
        </div>

        <div className="mb-2">
          <StatusBadge status={status} />
        </div>

        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-3">
          Coordinator Verification In Progress
        </h1>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
          {status === 'PENDING' &&
            'Your institutional internship coordinator credentials are currently awaiting review by the Super Administrator. Once verified against your university records, listing management features will be unlocked automatically.'}
          {status === 'REJECTED' &&
            'Your coordinator authorization request could not be approved. Please verify your employee ID and institutional documentation with support.'}
          {status === 'SUSPENDED' &&
            'Your coordinator account permissions have been temporarily suspended. Please contact the platform administration.'}
          {status === 'APPROVED' &&
            'Your authorization has been granted! You may now access the Internship Coordinator management dashboard.'}
        </p>

        <div className="mt-5 p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-700 text-left text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5">
          <p>
            <strong className="text-neutral-900 dark:text-neutral-100">Coordinator:</strong> {user?.fullName}
          </p>
          <p>
            <strong className="text-neutral-900 dark:text-neutral-100">University:</strong> {user?.university || 'University Office'}
          </p>
          <p>
            <strong className="text-neutral-900 dark:text-neutral-100">Department:</strong> {user?.department || 'Career Linkage'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={checkStatus}
            isLoading={checking}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Check Status Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            leftIcon={<LogOut className="w-4 h-4" />}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

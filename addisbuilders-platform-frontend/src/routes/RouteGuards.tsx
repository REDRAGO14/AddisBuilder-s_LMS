import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { USER_ROLES } from '../constants';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors">
        <LoadingSpinner size="lg" label="Verifying authentication session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { user, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors">
        <LoadingSpinner size="lg" label="Verifying access permissions..." />
      </div>
    );
  }

  if (!user || !role || !allowedRoles.includes(role)) {
    // If authenticated but wrong role, redirect to their role's appropriate home or access-denied
    if (role && USER_ROLES[role]) {
      return <Navigate to="/access-denied" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

interface CoordinatorApprovalGuardProps {
  children: React.ReactNode;
}

export const CoordinatorApprovalGuard: React.FC<CoordinatorApprovalGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors">
        <LoadingSpinner size="lg" label="Checking coordinator credentials..." />
      </div>
    );
  }

  if (user?.role === 'INTERNSHIP_COORDINATOR') {
    const status = user.coordinatorStatus || 'PENDING';
    if (status !== 'APPROVED') {
      return <Navigate to="/coordinator-pending" replace />;
    }
  }

  return <>{children}</>;
};

interface MentorApprovalGuardProps {
  children: React.ReactNode;
}

export const MentorApprovalGuard: React.FC<MentorApprovalGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 transition-colors">
        <LoadingSpinner size="lg" label="Checking mentor accreditation..." />
      </div>
    );
  }

  if (user?.role === 'MENTOR') {
    const status = user.mentorStatus || 'APPROVED'; // default to approved for demo accounts
    if (status !== 'APPROVED') {
      return (
        <div className="max-w-2xl mx-auto py-12 px-4">
          <Card className="p-8 text-center space-y-4 bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-900/50 shadow-sm">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Faculty Verification In Progress</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
              Your mentor account is currently pending administrative review. Institutional proof documents and faculty employee credentials must be approved by platform administrators before creating courses or grading assignments.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link to="/mentor/dashboard">
                <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};

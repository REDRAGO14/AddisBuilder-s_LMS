import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, RoleGuard, CoordinatorApprovalGuard } from '../routes/RouteGuards';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Protected Routes & Role-Based Access Guards', () => {
  it('redirects unauthenticated users to /login', () => {
    const mockAuth: any = {
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <div>Secret Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Sign In Screen</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sign In Screen')).toBeInTheDocument();
    expect(screen.queryByText('Secret Protected Content')).not.toBeInTheDocument();
  });

  it('permits authorized role and renders protected dashboard content', () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: studentUser,
      role: 'LEARNER',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/learner/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <RoleGuard allowedRoles={['LEARNER']}>
            <div>Student Dashboard Secret Workspace</div>
          </RoleGuard>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Student Dashboard Secret Workspace')).toBeInTheDocument();
  });

  it('blocks unauthorized roles and redirects to access denied', () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: studentUser,
      role: 'LEARNER',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/super-admin/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/super-admin/dashboard"
              element={
                <RoleGuard allowedRoles={['SUPER_ADMIN']}>
                  <div>Super Admin Restricted Area</div>
                </RoleGuard>
              }
            />
            <Route path="/access-denied" element={<div>Access Denied Screen</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Access Denied Screen')).toBeInTheDocument();
    expect(screen.queryByText('Super Admin Restricted Area')).not.toBeInTheDocument();
  });

  it('redirects pending coordinators to approval holding screen', () => {
    const pendingCoordinator: User = {
      id: 'user-coord-pending',
      email: 'pending@addisbuilder.edu',
      fullName: 'Marta Bekele',
      role: 'INTERNSHIP_COORDINATOR',
      coordinatorStatus: 'PENDING',
      createdAt: '2026-01-10T14:30:00Z',
      isActive: true,
    };

    const mockAuth: any = {
      user: pendingCoordinator,
      role: 'INTERNSHIP_COORDINATOR',
      isAuthenticated: true,
      isLoading: false,
    };

    render(
      <MemoryRouter initialEntries={['/internship-manager/dashboard']}>
        <AuthContext.Provider value={mockAuth}>
          <Routes>
            <Route
              path="/internship-manager/dashboard"
              element={
                <CoordinatorApprovalGuard>
                  <div>Coordinator Workspace</div>
                </CoordinatorApprovalGuard>
              }
            />
            <Route path="/coordinator-pending" element={<div>Pending Institutional Review</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Pending Institutional Review')).toBeInTheDocument();
    expect(screen.queryByText('Coordinator Workspace')).not.toBeInTheDocument();
  });
});

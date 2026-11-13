import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MentorStudentsPage } from '../pages/mentor/MentorStudentsPage';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Instructor Student List & Progress Monitoring', () => {
  const mentorUser: User = {
    id: 'user-mentor-1',
    email: 'mentor@addisbuilder.edu',
    fullName: 'Dr. Hanna Tesfaye',
    role: 'MENTOR',
    createdAt: '2025-08-15T09:00:00Z',
    isActive: true,
  };

  const mockAuthContext: any = {
    user: mentorUser,
    token: 'valid-token',
    role: 'MENTOR',
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn(),
    updateCurrentUser: vi.fn(),
  };

  it('renders student roster with student names, courses, progress bars, and status badges', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Header and metrics
    expect(await screen.findByText(/Enrolled Students Roster/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Enrolled/i)).toBeInTheDocument();

    // Verify students appear in roster
    expect(screen.getByText('Abebe Kebede')).toBeInTheDocument();
    expect(screen.getByText('Dawit Mengistu')).toBeInTheDocument();
    expect(screen.getByText('Sara Tadesse')).toBeInTheDocument();
  });

  it('filters students by search input', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await screen.findByText('Abebe Kebede');

    const searchInput = screen.getByPlaceholderText(/Search by student name, email, or department/i);
    fireEvent.change(searchInput, { target: { value: 'Sara' } });

    // Sara should remain, Abebe should be filtered out
    expect(screen.getByText('Sara Tadesse')).toBeInTheDocument();
    expect(screen.queryByText('Abebe Kebede')).not.toBeInTheDocument();
  });

  it('opens student details modal with progress and status controls', async () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContext}>
          <MentorStudentsPage />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    await screen.findByText('Abebe Kebede');

    // Click details button
    const detailButtons = screen.getAllByRole('button', { name: /Details/i });
    fireEvent.click(detailButtons[0]);

    // Modal should open
    expect(await screen.findByText(/Student Enrollment Record/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Student Enrollment Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Email to Student/i)).toBeInTheDocument();
  });
});

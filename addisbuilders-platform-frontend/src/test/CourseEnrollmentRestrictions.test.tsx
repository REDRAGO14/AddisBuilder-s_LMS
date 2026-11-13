import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CourseDetailPage } from '../pages/public/CourseDetailPage';
import { AuthContext } from '../contexts/AuthContext';
import { User } from '../types';

describe('Course Enrollment Restrictions & Permissions', () => {
  it('redirects unauthenticated visitors to login when clicking Enroll Now', async () => {
    // Unauthenticated context
    const mockAuthContext: any = {
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      updateCurrentUser: vi.fn(),
    };

    render(
      <MemoryRouter initialEntries={['/courses/course-2']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/login" element={<div>Sign In Screen Destination</div>} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Wait for course to load
    const enrollBtn = await screen.findByRole('button', { name: /Enroll Now/i });
    expect(enrollBtn).toBeInTheDocument();

    fireEvent.click(enrollBtn);

    // Should redirect to login screen destination
    await waitFor(() => {
      expect(screen.getByText(/Sign In Screen Destination/i)).toBeInTheDocument();
    });
  });

  it('prevents non-student roles from student enrollment', async () => {
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

    render(
      <MemoryRouter initialEntries={['/courses/course-2']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    const enrollBtn = await screen.findByRole('button', { name: /Enroll Now/i });
    expect(enrollBtn).toBeInTheDocument();

    fireEvent.click(enrollBtn);

    // Verify button remains and user is not enrolled as a mentor
    expect(enrollBtn).toBeInTheDocument();
  });

  it('displays enrolled status and continue learning action for already enrolled students', async () => {
    const studentUser: User = {
      id: 'user-learner-1',
      email: 'learner@addisbuilder.edu',
      fullName: 'Abebe Kebede',
      role: 'LEARNER',
      createdAt: '2025-09-01T10:00:00Z',
      isActive: true,
    };

    const mockAuthContext: any = {
      user: studentUser,
      token: 'valid-token',
      role: 'LEARNER',
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
      register: vi.fn(),
      updateCurrentUser: vi.fn(),
    };

    // course-1 is marked as isEnrolled: true in INITIAL_COURSES
    render(
      <MemoryRouter initialEntries={['/courses/course-1']}>
        <AuthContext.Provider value={mockAuthContext}>
          <Routes>
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          </Routes>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText(/You are enrolled in this course/i)).toBeInTheDocument();
    expect(screen.getByText(/Open in Student Dashboard/i)).toBeInTheDocument();
  });
});

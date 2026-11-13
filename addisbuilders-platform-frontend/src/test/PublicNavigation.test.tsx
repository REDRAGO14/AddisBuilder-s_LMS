import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { AuthProvider } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';

describe('Public Website Navigation', () => {
  it('renders the 4 primary navigation items in exact required order: HOME, COURSES, INTERNSHIPS, CONTACT', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    // Desktop navigation container
    const nav = screen.getByRole('navigation', { name: '' });
    const links = nav.querySelectorAll('a');

    expect(links).toHaveLength(4);
    expect(links[0].textContent).toContain('HOME');
    expect(links[0].getAttribute('href')).toBe('/');

    expect(links[1].textContent).toContain('COURSES');
    expect(links[1].getAttribute('href')).toBe('/courses');

    expect(links[2].textContent).toContain('INTERNSHIPS');
    expect(links[2].getAttribute('href')).toBe('/internships');

    expect(links[3].textContent).toContain('CONTACT');
    expect(links[3].getAttribute('href')).toBe('/contact');
  });

  it('renders brand logo and sign in buttons for unauthenticated visitors', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/AddisBuilder/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });
});

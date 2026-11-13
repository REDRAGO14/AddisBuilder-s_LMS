import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';
import { LanguageProvider } from '../contexts/LanguageContext';

const renderBadge = (status: string) =>
  render(
    <LanguageProvider>
      <StatusBadge status={status} />
    </LanguageProvider>
  );

describe('StatusBadge Component', () => {
  it('renders Approved status with readable text', () => {
    renderBadge('APPROVED');
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders Pending Review status with readable text', () => {
    renderBadge('PENDING');
    expect(screen.getByText('Pending Review')).toBeInTheDocument();
  });

  it('renders Verified organization status', () => {
    renderBadge('VERIFIED');
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });

  it('renders Rejected status with readable text', () => {
    renderBadge('REJECTED');
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });
});

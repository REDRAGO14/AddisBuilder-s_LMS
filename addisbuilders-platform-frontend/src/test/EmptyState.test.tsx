import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { EmptyState } from '../components/feedback/EmptyState';

describe('EmptyState Component', () => {
  it('renders title and description properly', () => {
    render(
      <EmptyState
        title="No courses found"
        description="Try searching with a different term."
        action={<button>Clear</button>}
      />
    );
    expect(screen.getByText('No courses found')).toBeInTheDocument();
    expect(screen.getByText('Try searching with a different term.')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });
});

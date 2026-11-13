import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ProfilePhotoUploader } from '../components/ui/ProfilePhotoUploader';
import { AuthProvider } from '../contexts/AuthContext';

describe('Profile Photo Validation & Management', () => {
  it('displays default initials avatar when no photo exists', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader userName="Abebe Kebede" />
      </AuthProvider>
    );

    // Initial letters 'AK' should appear in avatar circle
    expect(screen.getByText('AK')).toBeInTheDocument();
    expect(screen.getByText('Upload Photo')).toBeInTheDocument();
  });

  it('displays current photo when avatar URL is provided', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader
          userName="Sara Tadesse"
          currentAvatarUrl="https://example.com/sara.jpg"
        />
      </AuthProvider>
    );

    const img = screen.getByRole('img', { name: /Sara Tadesse's profile/i });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute('src')).toBe('https://example.com/sara.jpg');
    expect(screen.getByText('Replace Photo')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('rejects invalid file formats with an error message', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader userName="Test User" />
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Select profile picture file/i) as HTMLInputElement;

    // Simulate uploading a disallowed file type (e.g. text/plain)
    const invalidFile = new File(['dummy content'], 'document.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [invalidFile] } });

    expect(
      screen.getByText(/Invalid file format. Please upload a JPG, PNG, or WebP image./i)
    ).toBeInTheDocument();
  });

  it('rejects files exceeding maximum size limit', () => {
    render(
      <AuthProvider>
        <ProfilePhotoUploader
          userName="Test User"
          maxSizeBytes={1024 * 1024} // 1MB limit for test
        />
      </AuthProvider>
    );

    const input = screen.getByLabelText(/Select profile picture file/i) as HTMLInputElement;

    // 2MB dummy file
    const oversized = new File([new ArrayBuffer(2 * 1024 * 1024)], 'large-photo.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [oversized] } });

    expect(screen.getByText(/Image file exceeds maximum allowed limit/i)).toBeInTheDocument();
  });
});

import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { Camera, Trash2, UploadCloud, Check, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { usersService } from '../../services/users.service';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../utils';

export interface ProfilePhotoUploaderProps {
  currentAvatarUrl?: string;
  userName?: string;
  onAvatarUpdated?: (newAvatarUrl?: string) => void;
  maxSizeBytes?: number; // default 5MB
  allowedFormats?: string[]; // default ['image/jpeg', 'image/png', 'image/webp']
}

export const ProfilePhotoUploader: React.FC<ProfilePhotoUploaderProps> = ({
  currentAvatarUrl,
  userName = 'User',
  onAvatarUpdated,
  maxSizeBytes = 5 * 1024 * 1024, // 5 MB
  allowedFormats = ['image/jpeg', 'image/png', 'image/webp'],
}) => {
  const { updateCurrentUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError(null);
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // File type validation
    if (!allowedFormats.includes(file.type)) {
      const errorMsg = 'Invalid file format. Please upload a JPG, PNG, or WebP image.';
      setValidationError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // File size validation
    if (file.size > maxSizeBytes) {
      const errorMsg = `Image file exceeds maximum allowed limit of ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB.`;
      setValidationError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Set preview
    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleCancelPreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setValidationError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setValidationError(null);

    try {
      const updatedUser = await usersService.uploadProfilePhoto(selectedFile);
      updateCurrentUser(updatedUser);
      onAvatarUpdated?.(updatedUser.avatarUrl);
      toast.success('Profile photo updated successfully!');
      handleCancelPreview();
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to upload photo. Please try again.';
      setValidationError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm('Are you sure you want to remove your profile photo?')) return;

    setIsRemoving(true);
    try {
      const updatedUser = await usersService.removeProfilePhoto();
      updateCurrentUser(updatedUser);
      onAvatarUpdated?.(undefined);
      toast.success('Profile photo removed.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove photo.');
    } finally {
      setIsRemoving(false);
    }
  };

  const displayAvatar = previewUrl || currentAvatarUrl;

  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar Display */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-200 dark:border-brand-800 shadow-inner bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={`${userName}'s profile`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-brand-800 text-white flex items-center justify-center text-2xl font-bold tracking-tight">
                {getInitials(userName)}
              </div>
            )}
          </div>

          {/* Quick trigger overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
            aria-label="Change profile picture"
          >
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">Change</span>
          </button>
        </div>

        {/* Action Controls & Instructions */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div>
            <h3 className="text-sm font-bold text-neutral-900">Profile Photo</h3>
            <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
              Upload a clear professional headshot. Accepted formats: JPG, PNG, or WebP (max 5MB).
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
            onChange={handleFileSelect}
            aria-label="Select profile picture file"
          />

          {/* Validation Error Alert */}
          {validationError && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Button Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
            {previewUrl ? (
              <>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleConfirmUpload}
                  isLoading={isUploading}
                  leftIcon={<Check className="w-4 h-4" />}
                >
                  Save Photo
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelPreview}
                  disabled={isUploading}
                  leftIcon={<X className="w-4 h-4" />}
                >
                  Cancel
                </Button>
                <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  Preview mode (click Save to confirm)
                </span>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<UploadCloud className="w-4 h-4" />}
                >
                  {currentAvatarUrl ? 'Replace Photo' : 'Upload Photo'}
                </Button>

                {currentAvatarUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleRemovePhoto}
                    isLoading={isRemoving}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Remove
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

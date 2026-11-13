import React, { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { Button } from './Button';
import { uploadsService } from '../../services/uploads.service';
import { cn } from '../../utils';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeBytes?: number; // e.g., 5 * 1024 * 1024 (5MB)
  purpose: 'CV' | 'VERIFICATION_DOC' | 'COURSE_MATERIAL' | 'AVATAR';
  onUploadSuccess: (result: { url: string; filename: string }) => void;
  error?: string;
  currentFileUrl?: string;
  currentFileName?: string;
  helperText?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label = 'Upload Document',
  accept = '.pdf,.doc,.docx',
  maxSizeBytes = 10 * 1024 * 1024, // 10MB default
  purpose,
  onUploadSuccess,
  error,
  currentFileUrl,
  currentFileName,
  helperText,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeBytes) {
      setUploadError(`File is too large. Maximum allowed size is ${maxMb}MB.`);
      setSelectedFile(null);
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setUploading(true);

    try {
      const res = await uploadsService.uploadFile(file, purpose);
      setUploadSuccess(true);
      onUploadSuccess({ url: res.url, filename: res.filename });
    } catch (err: any) {
      setUploadError(err.message || 'File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="block text-sm font-medium text-neutral-800">{label}</label>}

      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-5 text-center transition-colors',
          uploadError || error
            ? 'border-red-300 bg-red-50/50'
            : uploadSuccess
            ? 'border-emerald-300 bg-emerald-50/40'
            : 'border-neutral-300 hover:border-brand-600 bg-neutral-50/50'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          id={`upload-${purpose}`}
        />

        {uploading ? (
          <div className="py-2 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-brand-800 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm font-medium text-neutral-700">Uploading {selectedFile?.name}...</p>
            <p className="text-xs text-neutral-400 mt-1">Please wait while the file is processed.</p>
          </div>
        ) : uploadSuccess && selectedFile ? (
          <div className="flex items-center justify-between bg-white dark:bg-neutral-900 border border-emerald-200 dark:border-emerald-900/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-left">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-neutral-800 truncate max-w-xs">{selectedFile.name}</p>
                <p className="text-xs text-emerald-700">Uploaded successfully ({(selectedFile.size / 1024).toFixed(0)} KB)</p>
              </div>
            </div>
            <button
              type="button"
              onClick={clearSelection}
              className="text-neutral-400 hover:text-neutral-600 p-1"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : currentFileName ? (
          <div className="flex items-center justify-between bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-3">
            <div className="flex items-center gap-2 text-left">
              <File className="w-5 h-5 text-brand-700 shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-neutral-800">{currentFileName}</p>
                <p className="text-xs text-neutral-500">Currently attached file</p>
              </div>
            </div>
            <label
              htmlFor={`upload-${purpose}`}
              className="text-xs text-brand-800 font-medium hover:underline cursor-pointer"
            >
              Replace
            </label>
          </div>
        ) : (
          <div className="flex flex-col items-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <UploadCloud className="w-9 h-9 text-neutral-400 mb-2" />
            <p className="text-sm font-medium text-neutral-700">
              <span className="text-brand-800 underline font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              Accepted: {accept.replace(/\./g, ' ').toUpperCase()} (Max {maxMb}MB)
            </p>
          </div>
        )}
      </div>

      {(uploadError || error) && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError || error}</span>
        </div>
      )}

      {helperText && !uploadError && !error && (
        <p className="text-xs text-neutral-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};

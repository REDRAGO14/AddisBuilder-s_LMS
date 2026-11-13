import { apiClient, USE_MOCK } from './api';

export interface UploadResult {
  url: string;
  filename: string;
  sizeBytes: number;
}

export const uploadsService = {
  async uploadFile(file: File, purpose: 'CV' | 'VERIFICATION_DOC' | 'COURSE_MATERIAL' | 'AVATAR'): Promise<UploadResult> {
    // Validate file constraints
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      throw new Error(`File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10 MB limit.`);
    }

    if (USE_MOCK) {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 400));
      // In browser mock mode, create an object URL or mock CDN link
      const fakeUrl = URL.createObjectURL(file);
      return {
        url: fakeUrl,
        filename: file.name,
        sizeBytes: file.size,
      };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', purpose);

    const response = await apiClient.post<UploadResult>('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

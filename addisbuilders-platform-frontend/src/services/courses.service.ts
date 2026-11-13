import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Course, CourseMaterial } from '../types';

export const coursesService = {
  async getCourses(filters?: { category?: string; level?: string; search?: string }): Promise<Course[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getCourses();
      if (filters?.category && filters.category !== 'All') {
        list = list.filter((c) => c.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters?.level && filters.level !== 'All') {
        list = list.filter((c) => c.level === filters.level);
      }
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        list = list.filter(
          (c) =>
            c.title.toLowerCase().includes(query) ||
            c.description.toLowerCase().includes(query) ||
            c.category.toLowerCase().includes(query)
        );
      }
      return list;
    }
    const response = await apiClient.get<Course[]>('/courses', { params: filters });
    return response.data;
  },

  async getCourseById(id: string): Promise<Course> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(id);
      if (!course) throw new Error('Course not found');
      return course;
    }
    const response = await apiClient.get<Course>(`/courses/${id}`);
    return response.data;
  },

  async createCourse(data: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudentsCount'>): Promise<Course> {
    if (USE_MOCK) {
      return mockStorage.createCourse(data);
    }
    // Prepare payload matching CreateCourseRequest
    const payload = {
      ...data,
      learningObjectives: Array.isArray(data.learningObjectives)
        ? data.learningObjectives.join('\n')
        : data.learningObjectives,
    };
    const response = await apiClient.post<Course>('/courses', payload);
    return response.data;
  },

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    if (USE_MOCK) {
      return mockStorage.updateCourse(id, updates);
    }
    const payload = {
      ...updates,
      learningObjectives: Array.isArray(updates.learningObjectives)
        ? updates.learningObjectives.join('\n')
        : updates.learningObjectives,
    };
    const response = await apiClient.patch<Course>(`/courses/${id}`, payload);
    return response.data;
  },

  async publishCourse(id: string): Promise<Course> {
    if (USE_MOCK) {
      return mockStorage.updateCourse(id, { status: 'PUBLISHED' });
    }
    const response = await apiClient.patch<Course>(`/courses/${id}/publish`);
    return response.data;
  },

  async enrollCourse(courseId: string): Promise<Course> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('addis_auth_user');
      const userId = stored ? JSON.parse(stored).id : 'user-learner-1';
      return mockStorage.enrollCourse(courseId, userId);
    }
    const response = await apiClient.post<Course>(`/courses/${courseId}/enroll`);
    return response.data;
  },

  async getMaterials(courseId: string): Promise<CourseMaterial[]> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(courseId);
      return course?.materials || [];
    }
    const response = await apiClient.get<CourseMaterial[]>(`/courses/${courseId}/materials`);
    return response.data;
  },

  async addMaterial(courseId: string, material: Omit<CourseMaterial, 'id' | 'uploadedAt' | 'createdAt'>): Promise<CourseMaterial> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(courseId);
      if (!course) throw new Error('Course not found');
      const newMat: CourseMaterial = {
        ...material,
        id: `mat-${Date.now()}`,
        courseId,
        uploadedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      const updatedMaterials = [...(course.materials || []), newMat];
      await mockStorage.updateCourse(courseId, { materials: updatedMaterials });
      return newMat;
    }
    const response = await apiClient.post<CourseMaterial>(`/courses/${courseId}/materials`, material);
    return response.data;
  },

  async updateMaterial(courseId: string, materialId: string, updates: Partial<CourseMaterial>): Promise<CourseMaterial> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(courseId);
      if (!course) throw new Error('Course not found');
      const mats = (course.materials || []).map((m) =>
        String(m.id) === String(materialId) ? { ...m, ...updates } : m
      );
      await mockStorage.updateCourse(courseId, { materials: mats });
      const found = mats.find((m) => String(m.id) === String(materialId));
      if (!found) throw new Error('Material not found');
      return found;
    }
    const response = await apiClient.patch<CourseMaterial>(`/courses/${courseId}/materials/${materialId}`, updates);
    return response.data;
  },

  async deleteMaterial(courseId: string, materialId: string): Promise<void> {
    if (USE_MOCK) {
      const course = await mockStorage.getCourseById(courseId);
      if (course) {
        const mats = (course.materials || []).filter((m) => String(m.id) !== String(materialId));
        await mockStorage.updateCourse(courseId, { materials: mats });
      }
      return;
    }
    await apiClient.delete(`/courses/${courseId}/materials/${materialId}`);
  },
};

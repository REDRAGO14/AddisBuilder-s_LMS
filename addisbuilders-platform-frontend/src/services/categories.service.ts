import { apiClient, USE_MOCK } from './api';
import { CategoryResponse } from '../types';
import { COURSE_CATEGORIES } from '../constants';

let mockCategories: CategoryResponse[] = COURSE_CATEGORIES.map((name, index) => ({
  id: index + 1,
  name,
  description: `Curriculum covering core principles, hands-on labs, and industry projects in ${name}.`,
}));

export const categoriesService = {
  async getCategories(): Promise<CategoryResponse[]> {
    if (USE_MOCK) {
      return [...mockCategories];
    }
    const response = await apiClient.get<CategoryResponse[]>('/course-categories');
    return response.data;
  },

  async getCategoryById(id: number | string): Promise<CategoryResponse> {
    if (USE_MOCK) {
      const found = mockCategories.find((c) => String(c.id) === String(id));
      if (!found) throw new Error('Category not found');
      return found;
    }
    const response = await apiClient.get<CategoryResponse>(`/course-categories/${id}`);
    return response.data;
  },

  async createCategory(data: { name: string; description?: string }): Promise<CategoryResponse> {
    if (USE_MOCK) {
      const newCat: CategoryResponse = {
        id: mockCategories.length + 1,
        name: data.name,
        description: data.description,
      };
      mockCategories.push(newCat);
      return newCat;
    }
    const response = await apiClient.post<CategoryResponse>('/course-categories', data);
    return response.data;
  },

  async deleteCategory(id: number | string): Promise<void> {
    if (USE_MOCK) {
      mockCategories = mockCategories.filter((c) => String(c.id) !== String(id));
      return;
    }
    await apiClient.delete(`/course-categories/${id}`);
  },
};

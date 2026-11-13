import { apiClient, USE_MOCK } from './api';
import { mockStorage } from './mockStorage';
import { Enrollment, CourseModule, CourseProgressResponse, Lesson } from '../types';

export interface EnrollmentFilters {
  instructorId?: string;
  courseId?: string;
  studentId?: string;
  status?: string;
  search?: string;
}

export const enrollmentsService = {
  /**
   * Retrieves student records enrolled in an instructor's courses.
   * Enforces role authorization and filtering by course and status.
   */
  async getInstructorStudents(instructorId: string, filters?: EnrollmentFilters): Promise<Enrollment[]> {
    if (USE_MOCK) {
      let list = await mockStorage.getEnrollments({
        instructorId,
        courseId: filters?.courseId,
        status: filters?.status,
      });

      if (filters?.search) {
        const query = filters.search.toLowerCase().trim();
        list = list.filter(
          (e) =>
            e.studentName.toLowerCase().includes(query) ||
            e.studentEmail.toLowerCase().includes(query) ||
            e.courseTitle.toLowerCase().includes(query) ||
            e.studentDepartment?.toLowerCase().includes(query)
        );
      }
      return list;
    }

    const response = await apiClient.get<Enrollment[]>('/instructor/students', {
      params: { ...filters, instructorId },
    });
    return response.data;
  },

  /**
   * Retrieves all enrollments for a given student (defaults to /users/me/enrollments).
   */
  async getStudentEnrollments(studentId?: string): Promise<Enrollment[]> {
    if (USE_MOCK) {
      return mockStorage.getEnrollments({ studentId });
    }
    const response = await apiClient.get<Enrollment[]>('/users/me/enrollments');
    return response.data;
  },

  /**
   * NOTE: `GET /enrollments/{id}` does NOT exist on the backend (spec §6.7 —
   * only `PATCH /enrollments/{id}/status` is exposed). Fetch a learner's
   * enrollments via `getStudentEnrollments` or a mentor's via
   * `getInstructorStudents` and find the record client-side.
   */
  /**
   * Allows instructors to update an enrollment status (e.g. mark Completed or Dropped).
   */
  async updateEnrollmentStatus(id: string, status: 'ACTIVE' | 'COMPLETED' | 'DROPPED'): Promise<Enrollment> {
    if (USE_MOCK) {
      return mockStorage.updateEnrollmentStatus(id, status);
    }
    const response = await apiClient.patch<Enrollment>(`/enrollments/${id}/status`, { status });
    return response.data;
  },

  /**
   * Retrieves course curriculum modules with lessons.
   */
  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    if (USE_MOCK) {
      return mockStorage.getCourseModules(courseId);
    }
    const response = await apiClient.get<CourseModule[]>(`/courses/${courseId}/modules`);
    return response.data;
  },

  /**
   * Creates a new module under a course.
   */
  async createModule(courseId: string, data: { title: string; moduleOrder?: number }): Promise<CourseModule> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules(courseId);
      const newMod: CourseModule = {
        id: `mod-${Date.now()}`,
        courseId,
        title: data.title,
        order: data.moduleOrder || modules.length + 1,
        lessons: [],
      };
      modules.push(newMod);
      localStorage.setItem('addis_mock_modules', JSON.stringify(modules));
      return newMod;
    }
    const response = await apiClient.post<CourseModule>(`/courses/${courseId}/modules`, data);
    return response.data;
  },

  /**
   * Updates an existing module.
   */
  async updateModule(moduleId: string, data: { title?: string; moduleOrder?: number }): Promise<CourseModule> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules('all');
      const found = modules.find((m) => m.id === moduleId);
      if (found) {
        if (data.title) found.title = data.title;
        if (data.moduleOrder != null) found.order = data.moduleOrder;
        localStorage.setItem('addis_mock_modules', JSON.stringify(modules));
        return found;
      }
      throw new Error('Module not found');
    }
    const response = await apiClient.patch<CourseModule>(`/modules/${moduleId}`, data);
    return response.data;
  },

  /**
   * Deletes a module and cascading lessons.
   */
  async deleteModule(moduleId: string): Promise<void> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules('all');
      const filtered = modules.filter((m) => m.id !== moduleId);
      localStorage.setItem('addis_mock_modules', JSON.stringify(filtered));
      return;
    }
    await apiClient.delete(`/modules/${moduleId}`);
  },

  /**
   * Adds a new lesson to a module.
   */
  async createLesson(moduleId: string, data: Partial<Lesson>): Promise<Lesson> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules('all');
      const mod = modules.find((m) => m.id === moduleId);
      const newLesson: Lesson = {
        id: `les-${Date.now()}`,
        moduleId,
        title: data.title || 'Untitled Lesson',
        type: data.type || 'VIDEO',
        body: data.body || data.content,
        contentUrl: data.contentUrl || data.videoUrl || data.documentUrl,
        duration: data.duration || `${data.durationMinutes || 15}m`,
        durationMinutes: data.durationMinutes || 15,
        isCompleted: false,
      };
      if (mod) {
        mod.lessons.push(newLesson);
        localStorage.setItem('addis_mock_modules', JSON.stringify(modules));
      }
      return newLesson;
    }
    const response = await apiClient.post<Lesson>(`/modules/${moduleId}/lessons`, data);
    return response.data;
  },

  /**
   * Updates an existing lesson.
   */
  async updateLesson(lessonId: string, data: Partial<Lesson>): Promise<Lesson> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules('all');
      for (const mod of modules) {
        const lesson = mod.lessons.find((l) => l.id === lessonId);
        if (lesson) {
          Object.assign(lesson, data);
          localStorage.setItem('addis_mock_modules', JSON.stringify(modules));
          return lesson;
        }
      }
      throw new Error('Lesson not found');
    }
    const response = await apiClient.patch<Lesson>(`/lessons/${lessonId}`, data);
    return response.data;
  },

  /**
   * Deletes a lesson.
   */
  async deleteLesson(lessonId: string): Promise<void> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules('all');
      for (const mod of modules) {
        mod.lessons = mod.lessons.filter((l) => l.id !== lessonId);
      }
      localStorage.setItem('addis_mock_modules', JSON.stringify(modules));
      return;
    }
    await apiClient.delete(`/lessons/${lessonId}`);
  },

  /**
   * Marks a specific lesson as complete for the student.
   */
  async markLessonComplete(
    courseId: string,
    lessonId: string,
    studentId?: string
  ): Promise<{ progressPercentage: number; completedCount: number }> {
    if (USE_MOCK) {
      return mockStorage.markLessonComplete(courseId, lessonId, studentId || 'user-learner-1');
    }
    const response = await apiClient.post<{ progressPercentage: number; completedCount: number }>(
      `/courses/${courseId}/lessons/${lessonId}/complete`
    );
    return response.data;
  },

/**
   * Retrieves detailed course progress.
   */
  async getCourseProgress(courseId: string, studentId?: string | number): Promise<CourseProgressResponse> {
    if (USE_MOCK) {
      const modules = await mockStorage.getCourseModules(courseId);
      const allLessons = modules.flatMap((m) => m.lessons);
      const completed = allLessons.filter((l) => l.isCompleted);
      const percentage = allLessons.length > 0 ? (completed.length / allLessons.length) * 100 : 0;
      return {
        courseId: Number(courseId) || 1,
        courseTitle: 'Course Curriculum',
        totalLessons: allLessons.length,
        completedLessons: completed.length,
        completionPercentage: Number(percentage.toFixed(2)),
        completedLessonIds: completed.map((l, idx) => idx + 1),
      };
    }
    
    // Pass studentId as a query parameter so the backend targets the student, not the mentor
    const params = studentId ? { studentId } : {};
    const response = await apiClient.get<CourseProgressResponse>(`/courses/${courseId}/progress`, { params });
    return response.data;
  },
};

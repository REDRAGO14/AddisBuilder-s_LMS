import { apiClient, USE_MOCK } from './api';
import {
  StudyPlanResponse,
  ProgressSummaryResponse,
  InternshipMatchResponse,
  AiAnswerResponse,
} from '../types';

export const aiService = {
  async getStudyPlan(courseId: number | string): Promise<StudyPlanResponse> {
    if (USE_MOCK) {
      return {
        courseId: Number(courseId) || 1,
        courseTitle: 'Full-Stack Modern React & TypeScript Architecture',
        totalLessons: 12,
        remainingLessons: 4,
        estimatedWeeks: 2,
        weeklyMinutes: 300,
        items: [
          { lessonId: 9, lessonTitle: 'State Management with React Context & Reducers', moduleId: 3, moduleTitle: 'Advanced State Patterns', durationMinutes: 45, week: 1, status: 'NOT_STARTED' },
          { lessonId: 10, lessonTitle: 'React Hook Form & Zod Schema Validation', moduleId: 3, moduleTitle: 'Advanced State Patterns', durationMinutes: 60, week: 1, status: 'NOT_STARTED' },
          { lessonId: 11, lessonTitle: 'Automated Unit Testing with Vitest & RTL', moduleId: 4, moduleTitle: 'Testing & Production Quality', durationMinutes: 90, week: 2, status: 'NOT_STARTED' },
          { lessonId: 12, lessonTitle: 'Optimized Production Builds & Deployment', moduleId: 4, moduleTitle: 'Testing & Production Quality', durationMinutes: 75, week: 2, status: 'NOT_STARTED' },
        ],
      };
    }
    const response = await apiClient.get<StudyPlanResponse>('/ai/study-plan', { params: { courseId } });
    return response.data;
  },

  async getProgressSummary(): Promise<ProgressSummaryResponse> {
    if (USE_MOCK) {
      return {
        learnerId: 1,
        summary: 'Abebe is making consistent academic progress across software engineering tracks, demonstrating high engagement in frontend modules and timely assignment turn-in.',
        enrolledCourses: 3,
        completedLessons: 28,
        totalLessons: 42,
        completionPercentage: 66.7,
        gradedSubmissions: 4,
        averageGrade: 91.5,
        strengths: [
          'Excellent understanding of TypeScript static typing and component decoupling',
          'Fast turnaround time on code assignments (average 2 days before deadlines)',
          'High accuracy in API integration and error handling routines',
        ],
        recommendations: [
          'Spend more dedicated time on complex relational database queries and indices',
          'Review automated end-to-end testing practices before applying to senior backend roles',
        ],
      };
    }
    const response = await apiClient.get<ProgressSummaryResponse>('/ai/progress-summary');
    return response.data;
  },

  async getInternshipMatches(limit = 5): Promise<InternshipMatchResponse[]> {
    if (USE_MOCK) {
      const mockMatches: InternshipMatchResponse[] = [
        {
          internshipId: 1,
          title: 'Full-Stack Developer Intern',
          organizationName: 'Brolf Tech PLC',
          category: 'Software Engineering',
          workMode: 'REMOTE',
          location: 'Addis Ababa / Remote',
          matchScore: 94,
          reasons: [
            'Matches your completed coursework in React, TypeScript, and REST APIs',
            'Your 91.5% average grade meets and exceeds minimum criteria (80%)',
            'Strong portfolio submission verified by faculty instructor',
          ],
        },
        {
          internshipId: 2,
          title: 'Frontend Web Application Trainee',
          organizationName: 'Ethio Telecom Innovation Hub',
          category: 'Frontend Engineering',
          workMode: 'HYBRID',
          location: 'Addis Ababa (Bole)',
          matchScore: 88,
          reasons: [
            'Direct alignment with component architecture and responsive design skills',
            'Hybrid arrangement fits your university academic timetable',
          ],
        },
        {
          internshipId: 3,
          title: 'Junior Cloud Systems Intern',
          organizationName: 'Addis Cloud Technologies',
          category: 'Cloud & DevOps',
          workMode: 'ON_SITE',
          location: 'Kazanchis, Addis Ababa',
          matchScore: 76,
          reasons: [
            'Requires Linux fundamentals which you have completed in prerequisite coursework',
            'Great pathway toward cloud infrastructure certifications',
          ],
        },
      ];
      return mockMatches.slice(0, limit);
    }
    const response = await apiClient.get<InternshipMatchResponse[]>('/ai/internship-matches', { params: { limit } });
    return response.data;
  },

  async askQuestion(question: string, courseId?: number | string): Promise<AiAnswerResponse> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return {
        answer: `Based on your course materials and academic syllabus: "${question}" is addressed in Module 2 and 3. Ensure you review the slide deck and complete the corresponding hands-on exercise before attempting Assignment 2.`,
        sources: [
          'Lecture Notes: Component Lifecycle & Hooks.pdf (p. 14)',
          'Lab Exercise 3: State Management Guide',
        ],
        aiGenerated: false,
      };
    }
    const response = await apiClient.post<AiAnswerResponse>('/ai/ask', {
      question,
      courseId: courseId ? Number(courseId) : undefined,
    });
    return response.data;
  },
};

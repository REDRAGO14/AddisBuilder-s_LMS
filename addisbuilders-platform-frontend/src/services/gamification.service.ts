import { apiClient, USE_MOCK } from './api';
import { LeaderboardEntryResponse, AchievementResponse } from '../types';

const MOCK_LEADERBOARD: LeaderboardEntryResponse[] = [
  { rank: 1, learnerId: 101, learnerName: 'Sara Tadesse', university: 'Addis Ababa University', department: 'Computer Science', completedLessons: 48, gradedSubmissions: 12, averageGrade: 96.5, points: 637 },
  { rank: 2, learnerId: 102, learnerName: 'Dawit Mengistu', university: 'AAiT', department: 'Software Engineering', completedLessons: 45, gradedSubmissions: 11, averageGrade: 94.0, points: 599 },
  { rank: 3, learnerId: 103, learnerName: 'Abebe Kebede', university: 'Addis Ababa University', department: 'Computer Science', completedLessons: 40, gradedSubmissions: 10, averageGrade: 91.5, points: 542 },
  { rank: 4, learnerId: 104, learnerName: 'Betelhem Assefa', university: 'ASTU', department: 'Computer Science', completedLessons: 38, gradedSubmissions: 9, averageGrade: 89.0, points: 514 },
  { rank: 5, learnerId: 105, learnerName: 'Michael Haile', university: 'Hawassa University', department: 'Software Engineering', completedLessons: 35, gradedSubmissions: 8, averageGrade: 88.0, points: 478 },
  { rank: 6, learnerId: 106, learnerName: 'Yonas Berhanu', university: 'Bahir Dar University', department: 'Information Technology', completedLessons: 32, gradedSubmissions: 8, averageGrade: 85.5, points: 446 },
  { rank: 7, learnerId: 107, learnerName: 'Tigist Alemayehu', university: 'Mekelle University', department: 'Computer Science', completedLessons: 30, gradedSubmissions: 7, averageGrade: 87.0, points: 422 },
  { rank: 8, learnerId: 108, learnerName: 'Kalkidan Girma', university: 'Jimma University', department: 'Information Systems', completedLessons: 28, gradedSubmissions: 6, averageGrade: 84.0, points: 394 },
  { rank: 9, learnerId: 109, learnerName: 'Ephrem Teshome', university: 'Arba Minch University', department: 'Software Engineering', completedLessons: 26, gradedSubmissions: 6, averageGrade: 82.5, points: 373 },
  { rank: 10, learnerId: 110, learnerName: 'Selamawit Desta', university: 'Dire Dawa University', department: 'Computer Science', completedLessons: 24, gradedSubmissions: 5, averageGrade: 85.0, points: 350 },
];

const MOCK_ACHIEVEMENTS: AchievementResponse[] = [
  { code: 'FIRST_STEPS', title: 'First Steps', description: 'Complete your first lesson on the platform.', earned: true, progressHint: 'Completed 1+ lessons' },
  { code: 'COURSE_EXPLORER', title: 'Course Explorer', description: 'Enroll in 3 or more courses.', earned: true, progressHint: 'Enrolled in 3 courses' },
  { code: 'COURSE_GRADUATE', title: 'Course Graduate', description: 'Complete all lessons and earn a completion certificate in at least one course.', earned: true, progressHint: '1 completed course' },
  { code: 'FIVE_COURSE_SCHOLAR', title: 'Five-Course Scholar', description: 'Achieve course completion across 5 full curricula.', earned: false, progressHint: '1 of 5 courses completed' },
  { code: 'SUBMISSION_STARTER', title: 'Submission Starter', description: 'Submit your first assignment code or lab report.', earned: true, progressHint: '3 assignments submitted' },
  { code: 'HIGH_ACHIEVER', title: 'High Achiever', description: 'Maintain an average grade of 85% or higher across all graded submissions.', earned: true, progressHint: 'Current average: 91.5%' },
  { code: 'INTERNSHIP_READY', title: 'Internship Ready', description: 'Apply to at least one verified industrial internship opportunity.', earned: true, progressHint: '2 applications submitted' },
  { code: 'INTERNSHIP_ACCEPTED', title: 'Internship Accepted', description: 'Receive an official acceptance offer from an industry partner.', earned: false, progressHint: 'Applications currently under review' },
  { code: 'TOP_TEN', title: 'Top 10 Scholar', description: 'Reach the top 10 on the national platform leaderboard.', earned: true, progressHint: 'Current rank: #3' },
];

export const gamificationService = {
  async getLeaderboard(limit = 10): Promise<LeaderboardEntryResponse[]> {
    if (USE_MOCK) {
      return MOCK_LEADERBOARD.slice(0, limit);
    }
    const response = await apiClient.get<LeaderboardEntryResponse[]>('/leaderboard', { params: { limit } });
    return response.data;
  },

  async getMyRank(): Promise<LeaderboardEntryResponse> {
    if (USE_MOCK) {
      return MOCK_LEADERBOARD[2]; // Abebe Kebede rank #3
    }
    const response = await apiClient.get<LeaderboardEntryResponse>('/leaderboard/me');
    return response.data;
  },

  async getMyAchievements(): Promise<AchievementResponse[]> {
    if (USE_MOCK) {
      return [...MOCK_ACHIEVEMENTS];
    }
    const response = await apiClient.get<AchievementResponse[]>('/achievements/me');
    return response.data;
  },
};

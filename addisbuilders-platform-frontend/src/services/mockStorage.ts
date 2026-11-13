import {
  User,
  Course,
  Assignment,
  AssignmentSubmission,
  Internship,
  InternshipApplication,
  Organization,
  CoordinatorRequest,
  MentorRequest,
  Notification,
  AuditLog,
  ApprovalStatus,
  ApplicationStatus,
  VerificationStatus,
  Enrollment,
  CourseModule,
  Lesson,
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_ORGANIZATION,
  INITIAL_COURSES,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_INTERNSHIPS,
  INITIAL_APPLICATIONS,
  INITIAL_COORDINATOR_REQUESTS,
  INITIAL_MENTOR_REQUESTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_ENROLLMENTS,
  INITIAL_COURSE_MODULES,
} from './mockData';

// Delay helper for realistic async experience
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

class MockStorage {
  private getStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(`addis_mock_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`addis_mock_${key}`, JSON.stringify(value));
    } catch {
      // Ignore quota errors in fallback
    }
  }

  // --- USERS ---
  async getUsers(): Promise<User[]> {
    await delay();
    return this.getStorage<User[]>('users', INITIAL_USERS);
  }

  async getUserById(id: string): Promise<User | null> {
    const users = await this.getUsers();
    return users.find((u) => u.id === id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    await delay();
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    const updated = { ...users[index], ...updates };
    users[index] = updated;
    this.setStorage('users', users);
    return updated;
  }

  async toggleUserActive(id: string): Promise<User> {
    await delay();
    const users = await this.getUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error('User not found');
    users[index].isActive = !users[index].isActive;
    this.setStorage('users', users);
    return users[index];
  }

  // --- COURSES ---
  async getCourses(): Promise<Course[]> {
    await delay();
    return this.getStorage<Course[]>('courses', INITIAL_COURSES);
  }

  async getCourseById(id: string): Promise<Course | null> {
    const courses = await this.getCourses();
    return courses.find((c) => c.id === id) || null;
  }

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudentsCount'>): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const newCourse: Course = {
      ...courseData,
      id: `course-${Date.now()}`,
      enrolledStudentsCount: 0,
      materials: courseData.materials || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    courses.unshift(newCourse);
    this.setStorage('courses', courses);
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const index = courses.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Course not found');
    const updated = { ...courses[index], ...updates, updatedAt: new Date().toISOString() };
    courses[index] = updated;
    this.setStorage('courses', courses);
    return updated;
  }

  async enrollCourse(courseId: string, userId: string): Promise<Course> {
    await delay();
    const courses = await this.getCourses();
    const index = courses.findIndex((c) => c.id === courseId);
    if (index === -1) throw new Error('Course not found');
    courses[index].isEnrolled = true;
    courses[index].enrolledStudentsCount += 1;
    courses[index].progressPercentage = courses[index].progressPercentage || 10;
    this.setStorage('courses', courses);

    // Sync to enrollments
    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const existing = enrollments.find((e) => e.courseId === courseId && e.studentId === userId);
    if (!existing) {
      const users = await this.getUsers();
      const currentUser = users.find((u) => u.id === userId);
      const newEnrollment: Enrollment = {
        id: `enr-${Date.now()}`,
        courseId,
        courseTitle: courses[index].title,
        studentId: userId,
        studentName: currentUser?.fullName || 'Enrolled Student',
        studentEmail: currentUser?.email || 'student@university.edu',
        studentAvatarUrl: currentUser?.avatarUrl,
        studentUniversity: currentUser?.university || 'Addis Ababa University',
        studentDepartment: currentUser?.department || 'Computer Science',
        enrollmentDate: new Date().toISOString(),
        status: 'ACTIVE',
        progressPercentage: 10,
        completedLessonsCount: 1,
        totalLessonsCount: 6,
        instructorId: courses[index].instructorId,
      };
      enrollments.unshift(newEnrollment);
      this.setStorage('enrollments', enrollments);
    }

    return courses[index];
  }

  // --- ENROLLMENTS & MODULES ---
  async getEnrollments(filters?: { instructorId?: string; courseId?: string; studentId?: string; status?: string }): Promise<Enrollment[]> {
    await delay();
    let enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    if (filters?.instructorId) {
      enrollments = enrollments.filter((e) => e.instructorId === filters.instructorId);
    }
    if (filters?.courseId && filters.courseId !== 'ALL') {
      enrollments = enrollments.filter((e) => e.courseId === filters.courseId);
    }
    if (filters?.studentId) {
      enrollments = enrollments.filter((e) => e.studentId === filters.studentId);
    }
    if (filters?.status && filters.status !== 'ALL') {
      enrollments = enrollments.filter((e) => e.status === filters.status);
    }
    return enrollments;
  }

  async getEnrollmentById(id: string): Promise<Enrollment | null> {
    const list = await this.getEnrollments();
    return list.find((e) => e.id === id) || null;
  }

  async updateEnrollmentStatus(id: string, status: 'ACTIVE' | 'COMPLETED' | 'DROPPED'): Promise<Enrollment> {
    await delay();
    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const index = enrollments.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enrollment record not found');
    enrollments[index].status = status;
    if (status === 'COMPLETED') {
      enrollments[index].progressPercentage = 100;
    }
    this.setStorage('enrollments', enrollments);
    return enrollments[index];
  }

  async getCourseModules(courseId: string): Promise<CourseModule[]> {
    await delay();
    const allModules = this.getStorage<CourseModule[]>('course_modules', INITIAL_COURSE_MODULES);
    const courseMods = allModules.filter((m) => m.courseId === courseId);
    if (courseMods.length > 0) return courseMods;

    // Return default modules for course
    return [
      {
        id: `mod-${courseId}-1`,
        courseId,
        title: 'Module 1: Orientation & Foundations',
        description: 'Comprehensive introduction to core concepts and syllabus objectives.',
        order: 1,
        lessons: [
          {
            id: `les-${courseId}-1`,
            moduleId: `mod-${courseId}-1`,
            title: '1.1 Introduction to Curriculum & Setup',
            type: 'VIDEO',
            duration: '25 min',
            content: 'Overview of foundational tools, course structure, and learning milestones.',
            isCompleted: true,
          },
          {
            id: `les-${courseId}-2`,
            moduleId: `mod-${courseId}-1`,
            title: '1.2 Core Theory & Principles',
            type: 'READING',
            duration: '15 min',
            content: 'Core reading on design patterns, software architecture, and standards.',
            isCompleted: false,
          },
        ],
      },
      {
        id: `mod-${courseId}-2`,
        courseId,
        title: 'Module 2: Practical Implementation & Lab Work',
        description: 'Hands-on practical implementation exercises and assignment milestones.',
        order: 2,
        lessons: [
          {
            id: `les-${courseId}-3`,
            moduleId: `mod-${courseId}-2`,
            title: '2.1 Implementation Deep Dive',
            type: 'VIDEO',
            duration: '40 min',
            content: 'Step-by-step coding walkthrough building robust and tested components.',
            isCompleted: false,
          },
        ],
      },
    ];
  }

  async markLessonComplete(courseId: string, lessonId: string, studentId: string): Promise<{ progressPercentage: number; completedCount: number }> {
    await delay();
    const allModules = this.getStorage<CourseModule[]>('course_modules', INITIAL_COURSE_MODULES);
    let totalLessons = 0;
    let completedLessons = 0;

    allModules.forEach((m) => {
      if (m.courseId === courseId) {
        m.lessons.forEach((l) => {
          totalLessons += 1;
          if (l.id === lessonId) {
            l.isCompleted = true;
          }
          if (l.isCompleted) {
            completedLessons += 1;
          }
        });
      }
    });
    this.setStorage('course_modules', allModules);

    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 100;

    const courses = await this.getCourses();
    const cIndex = courses.findIndex((c) => c.id === courseId);
    if (cIndex !== -1) {
      courses[cIndex].progressPercentage = progressPercentage;
      this.setStorage('courses', courses);
    }

    const enrollments = this.getStorage<Enrollment[]>('enrollments', INITIAL_ENROLLMENTS);
    const eIndex = enrollments.findIndex((e) => e.courseId === courseId && e.studentId === studentId);
    if (eIndex !== -1) {
      enrollments[eIndex].progressPercentage = progressPercentage;
      enrollments[eIndex].completedLessonsCount = completedLessons;
      enrollments[eIndex].totalLessonsCount = totalLessons;
      if (progressPercentage === 100) {
        enrollments[eIndex].status = 'COMPLETED';
      }
      this.setStorage('enrollments', enrollments);
    }

    return { progressPercentage, completedCount: completedLessons };
  }

  // --- ASSIGNMENTS ---
  async getAssignments(courseId?: string): Promise<Assignment[]> {
    await delay();
    const assignments = this.getStorage<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);
    if (courseId) {
      return assignments.filter((a) => a.courseId === courseId);
    }
    return assignments;
  }

  async createAssignment(data: Omit<Assignment, 'id' | 'createdAt' | 'submissionsCount'>): Promise<Assignment> {
    await delay();
    const assignments = await this.getAssignments();
    const newAssignment: Assignment = {
      ...data,
      id: `asg-${Date.now()}`,
      submissionsCount: 0,
      createdAt: new Date().toISOString(),
    };
    assignments.unshift(newAssignment);
    this.setStorage('assignments', assignments);
    return newAssignment;
  }

  // --- SUBMISSIONS ---
  async getSubmissions(assignmentId?: string, studentId?: string): Promise<AssignmentSubmission[]> {
    await delay();
    let submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    if (assignmentId) submissions = submissions.filter((s) => s.assignmentId === assignmentId);
    if (studentId) submissions = submissions.filter((s) => s.studentId === studentId);
    return submissions;
  }

  async createSubmission(data: Omit<AssignmentSubmission, 'id' | 'submittedAt' | 'status'>): Promise<AssignmentSubmission> {
    await delay();
    const submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    const newSub: AssignmentSubmission = {
      ...data,
      id: `sub-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'SUBMITTED',
    };
    submissions.unshift(newSub);
    this.setStorage('submissions', submissions);

    // Update assignment submission count
    const assignments = await this.getAssignments();
    const asgIndex = assignments.findIndex((a) => a.id === data.assignmentId);
    if (asgIndex !== -1) {
      assignments[asgIndex].submissionsCount = (assignments[asgIndex].submissionsCount || 0) + 1;
      this.setStorage('assignments', assignments);
    }
    return newSub;
  }

  async gradeSubmission(id: string, grade: number, feedback: string): Promise<AssignmentSubmission> {
    await delay();
    const submissions = this.getStorage<AssignmentSubmission[]>('submissions', INITIAL_SUBMISSIONS);
    const index = submissions.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Submission not found');
    submissions[index].grade = grade;
    submissions[index].feedback = feedback;
    submissions[index].status = 'GRADED';
    this.setStorage('submissions', submissions);
    return submissions[index];
  }

  // --- INTERNSHIPS ---
  async getInternships(): Promise<Internship[]> {
    await delay();
    return this.getStorage<Internship[]>('internships', INITIAL_INTERNSHIPS);
  }

  async getInternshipById(id: string): Promise<Internship | null> {
    const internships = await this.getInternships();
    return internships.find((i) => i.id === id) || null;
  }

  async createInternship(data: Omit<Internship, 'id' | 'createdAt' | 'applicantsCount'>): Promise<Internship> {
    await delay();
    const internships = await this.getInternships();
    const newInternship: Internship = {
      ...data,
      id: `intern-${Date.now()}`,
      applicantsCount: 0,
      createdAt: new Date().toISOString(),
    };
    internships.unshift(newInternship);
    this.setStorage('internships', internships);
    return newInternship;
  }

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    await delay();
    const internships = await this.getInternships();
    const index = internships.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Internship not found');
    const updated = { ...internships[index], ...updates };
    internships[index] = updated;
    this.setStorage('internships', internships);
    return updated;
  }

  async toggleSaveInternship(id: string): Promise<{ isSaved: boolean }> {
    await delay();
    const internships = await this.getInternships();
    const index = internships.findIndex((i) => i.id === id);
    if (index === -1) throw new Error('Internship not found');
    internships[index].isSaved = !internships[index].isSaved;
    this.setStorage('internships', internships);
    return { isSaved: !!internships[index].isSaved };
  }

  // --- APPLICATIONS ---
  async getApplications(internshipId?: string, applicantId?: string): Promise<InternshipApplication[]> {
    await delay();
    let apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    if (internshipId) apps = apps.filter((a) => a.internshipId === internshipId);
    if (applicantId) apps = apps.filter((a) => a.applicantId === applicantId);
    return apps;
  }

  async createApplication(data: Omit<InternshipApplication, 'id' | 'appliedAt' | 'status'>): Promise<InternshipApplication> {
    await delay();
    const apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    const newApp: InternshipApplication = {
      ...data,
      id: `app-${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    apps.unshift(newApp);
    this.setStorage('applications', apps);

    // Update internship applicant count and user hasApplied flag
    const internships = await this.getInternships();
    const internIndex = internships.findIndex((i) => i.id === data.internshipId);
    if (internIndex !== -1) {
      internships[internIndex].applicantsCount = (internships[internIndex].applicantsCount ?? 0) + 1;
      internships[internIndex].hasApplied = true;
      this.setStorage('internships', internships);
    }
    return newApp;
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus, notes?: string): Promise<InternshipApplication> {
    await delay();
    const apps = this.getStorage<InternshipApplication[]>('applications', INITIAL_APPLICATIONS);
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Application not found');
    apps[index].status = status;
    if (notes) apps[index].notes = notes;
    this.setStorage('applications', apps);
    return apps[index];
  }

  // --- ORGANIZATION ---
  async getOrganization(): Promise<Organization> {
    await delay();
    return this.getStorage<Organization>('organization', INITIAL_ORGANIZATION);
  }

  async updateOrganization(updates: Partial<Organization>): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    const updated = { ...org, ...updates };
    this.setStorage('organization', updated);
    return updated;
  }

  async submitOrganizationVerification(data: {
    registrationNumber: string;
    taxId: string;
    documentName: string;
    documentUrl: string;
  }): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    org.registrationNumber = data.registrationNumber;
    org.taxId = data.taxId;
    org.verificationStatus = 'PENDING';
    if (!org.documents) org.documents = [];
    org.documents.push({
      id: `doc-${Date.now()}`,
      name: data.documentName,
      type: 'VERIFICATION_PROOF',
      url: data.documentUrl,
      uploadedAt: new Date().toISOString(),
    });
    this.setStorage('organization', org);
    return org;
  }

  async setOrganizationVerificationStatus(status: VerificationStatus, notes?: string): Promise<Organization> {
    await delay();
    const org = await this.getOrganization();
    org.verificationStatus = status;
    if (notes) org.verificationNotes = notes;
    this.setStorage('organization', org);
    return org;
  }

  // --- COORDINATOR REQUESTS ---
  async getCoordinatorRequests(): Promise<CoordinatorRequest[]> {
    await delay();
    return this.getStorage<CoordinatorRequest[]>('coord_requests', INITIAL_COORDINATOR_REQUESTS);
  }

  async decideCoordinatorRequest(id: string, status: ApprovalStatus, notes?: string): Promise<CoordinatorRequest> {
    await delay();
    const reqs = await this.getCoordinatorRequests();
    const index = reqs.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Request not found');
    reqs[index].status = status;
    reqs[index].decisionDate = new Date().toISOString();
    if (notes) reqs[index].decisionNotes = notes;
    this.setStorage('coord_requests', reqs);

    // Also update corresponding user
    const users = await this.getUsers();
    const userIndex = users.findIndex((u) => u.id === reqs[index].userId);
    if (userIndex !== -1) {
      users[userIndex].coordinatorStatus = status;
      this.setStorage('users', users);
    }
    return reqs[index];
  }

  // --- MENTOR REQUESTS ---
  async getMentorRequests(): Promise<MentorRequest[]> {
    await delay();
    return this.getStorage<MentorRequest[]>('mentor_requests', INITIAL_MENTOR_REQUESTS);
  }

  async decideMentorRequest(id: string, status: ApprovalStatus, notes?: string): Promise<MentorRequest> {
    await delay();
    const reqs = await this.getMentorRequests();
    const index = reqs.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Mentor request not found');
    reqs[index].status = status;
    reqs[index].decisionDate = new Date().toISOString();
    if (notes) reqs[index].decisionNotes = notes;
    this.setStorage('mentor_requests', reqs);

    // Also update corresponding user
    const users = await this.getUsers();
    const userIndex = users.findIndex((u) => u.id === reqs[index].userId);
    if (userIndex !== -1) {
      users[userIndex].mentorStatus = status;
      this.setStorage('users', users);
    }
    return reqs[index];
  }

  // --- NOTIFICATIONS ---
  async getNotifications(userId: string): Promise<Notification[]> {
    await delay();
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    return notifs.filter((n) => n.userId === userId || n.userId === 'all');
  }

  async markNotificationRead(id: string): Promise<void> {
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    const index = notifs.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifs[index].isRead = true;
      this.setStorage('notifications', notifs);
    }
  }

  async markAllNotificationsRead(userId: string): Promise<void> {
    const notifs = this.getStorage<Notification[]>('notifications', INITIAL_NOTIFICATIONS);
    notifs.forEach((n) => {
      if (n.userId === userId) n.isRead = true;
    });
    this.setStorage('notifications', notifs);
  }

  // --- AUDIT LOGS ---
  async getAuditLogs(): Promise<AuditLog[]> {
    await delay();
    return this.getStorage<AuditLog[]>('audit_logs', INITIAL_AUDIT_LOGS);
  }
}

export const mockStorage = new MockStorage();

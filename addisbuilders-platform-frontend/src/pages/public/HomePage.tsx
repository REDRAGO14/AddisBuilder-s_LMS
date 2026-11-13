import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Skeleton } from '../../components/ui/Skeleton';
import { coursesService } from '../../services/courses.service';
import { internshipsService } from '../../services/internships.service';
import { Course, Internship } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  GraduationCap,
  Briefcase,
  Users,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Building2,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { formatDate } from '../../utils';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [featuredInternships, setFeaturedInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    // Public endpoints, but a backend outage must not leave skeletons forever.
    const safe = <T,>(p: Promise<T>): Promise<T | []> => p.catch(() => [] as T | []);
    Promise.all([safe(coursesService.getCourses()), safe(internshipsService.getInternships())]).then(
      ([courses, internships]) => {
        if (isMounted) {
          setFeaturedCourses((courses as Course[]).slice(0, 3));
          setFeaturedInternships((internships as Internship[]).slice(0, 3));
          setLoading(false);
        }
      }
    );
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-neutral-50 dark:from-neutral-900/60 dark:via-neutral-950 dark:to-neutral-950 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800/60 dark:border-neutral-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-emerald-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-brand-700 dark:text-emerald-400" />
            <span>{t('brand.challengeTag', 'Brolf Tech Remote Internship Challenge 2026')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight leading-[1.15]">
            {t('publicPages.home.heroTitle', 'Bridging Ethiopian Academic Excellence With Industry Careers')}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t('publicPages.home.heroSubtitle', 'AddisBuilder’s unites students, faculty mentors, university internship coordinators, and verified employers into one cohesive, production-grade learning and career ecosystem.')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link to="/courses" className="w-full sm:w-auto">
              <Button size="lg" className="w-full" leftIcon={<BookOpen className="w-4 h-4" />}>
                {t('publicPages.home.exploreCoursesBtn', 'Explore Courses')}
              </Button>
            </Link>
            <Link to="/internships" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full" leftIcon={<Briefcase className="w-4 h-4" />}>
                {t('publicPages.home.findInternshipsBtn', 'Browse Internships')}
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="w-full">
                {t('nav.services', 'Platform Services')}
              </Button>
            </Link>
          </div>

          {/* Key Stat Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-neutral-200 dark:border-neutral-800/80 dark:border-neutral-800 max-w-4xl mx-auto">
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-emerald-400">100%</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">
                {t('publicPages.home.statsPartners', 'Verified Organizations')}
              </p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-emerald-400">5 Roles</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Unified Multi-Dashboard</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-emerald-400">Practical</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Coursework & Assignments</p>
            </div>
            <div className="p-3 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-brand-900 dark:text-emerald-400">Audited</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-1">Institutional Governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Ecosystem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="brand">{t('publicPages.home.featuresTitle', 'Ecosystem Architecture')}</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-3">
            Built for Every Stakeholder in Higher Education
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
            AddisBuilder’s provides dedicated workflows tailored to university students, faculty, industry coordinators, employers, and system administrators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-brand-300 dark:hover:border-emerald-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mb-3">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Learners</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Enroll in faculty-led courses, submit assignments, track grading, and apply for verified internships.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-brand-300 dark:hover:border-emerald-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Mentors</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Create courses, distribute learning materials, author assignments, and grade student submissions with feedback.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-brand-300 dark:hover:border-emerald-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Coordinators</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              University linkage officers oversee approved industry listings, track university applicants, and monitor timelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-brand-300 dark:hover:border-emerald-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Employers</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Submit organizational credentials, post competitive internships, review CVs, and track candidate pipelines.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-brand-300 dark:hover:border-emerald-600 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">Super Admins</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
              Verify organizations, approve institutional coordinators, audit platform operations, and govern content.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="brand">{t('publicPages.courses.badge', 'Academic Learning')}</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-2">
              Featured Industry Courses
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Curated coursework developed by experienced academic faculty and engineering practitioners.
            </p>
          </div>
          <Link to="/courses">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
              {t('common.view', 'View All Courses')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={`course-skel-${i}`} className="p-5 space-y-4">
                <Skeleton className="h-44 w-full rounded-xl" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </Card>
            ))
          ) : (
            featuredCourses.map((course) => (
              <Card key={course.id} hoverEffect className="flex flex-col h-full">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <Badge variant="brand">{course.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{course.level}</span>
                    <span>•</span>
                    <span>{course.durationWeeks} Weeks</span>
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {course.shortDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {course.instructorAvatar && (
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">{course.instructorName}</span>
                  </div>
                  <Link to={`/courses/${course.id}`}>
                    <Button size="sm" variant="secondary">
                      {t('common.details', 'Details')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </section>

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Badge variant="brand">{t('publicPages.internships.badge', 'Career Acceleration')}</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mt-2">
              Featured University Internships
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Verified opportunities from leading technology organizations and accredited institutional partners.
            </p>
          </div>
          <Link to="/internships">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
              {t('common.view', 'View All Opportunities')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={`intern-skel-${i}`} className="p-5 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-8 w-full rounded-lg mt-4" />
              </Card>
            ))
          ) : (
            featuredInternships.map((internship) => (
              <Card key={internship.id} hoverEffect className="flex flex-col h-full">
                <CardContent className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge variant="brand">{internship.category}</Badge>
                    <Badge variant="neutral">{internship.workMode}</Badge>
                  </div>

                  <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug line-clamp-2">
                    {internship.title}
                  </h3>

                  <p className="text-xs font-semibold text-brand-800 dark:text-emerald-400 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {internship.organizationName}
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                    {internship.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      {internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
                      Deadline: {formatDate(internship.deadline)}
                    </span>
                  </div>

                  <Link to={`/internships/${internship.id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      View Opportunity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-neutral-900 dark:bg-neutral-900/90 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto border border-neutral-800">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs uppercase font-semibold text-brand-400 tracking-wider">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 text-white">
            How AddisBuilder’s Connects Academic Learning to Employment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-neutral-800/60 dark:bg-neutral-800/40 rounded-2xl border border-neutral-700/60 dark:border-neutral-700/40">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-base mb-2">Build Verified Competencies</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Students complete faculty-guided courses, submit verified code assignments, and receive structured grading.
            </p>
          </div>

          <div className="text-center p-6 bg-neutral-800/60 dark:bg-neutral-800/40 rounded-2xl border border-neutral-700/60 dark:border-neutral-700/40">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-base mb-2">Discover Verified Internships</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Apply to opportunities vetted by university internship coordinators and verified corporate partners.
            </p>
          </div>

          <div className="text-center p-6 bg-neutral-800/60 dark:bg-neutral-800/40 rounded-2xl border border-neutral-700/60 dark:border-neutral-700/40">
            <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-base mb-2">Launch Professional Career</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Track recruitment reviews, receive transparent status updates, and secure accredited practical industry experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

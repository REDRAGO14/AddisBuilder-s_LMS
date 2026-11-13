import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  BookOpen,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Building2,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Compass,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  const coreServices = [
    {
      id: 'courses',
      icon: <BookOpen className="w-7 h-7 text-brand-700 dark:text-emerald-400" />,
      badge: 'Core Learning',
      title: 'Online Courses & Academic Modules',
      description:
        'Access modular university-level curricula prepared by certified instructors, including lecture videos, downloadable reading resources, and structured syllabi.',
      features: [
        'Curated academic modules with clear learning objectives',
        'Downloadable reading packets, slides, and reference links',
        'Video lectures accessible on desktop and mobile',
        'Continuous content updates tailored to industry demands',
      ],
      actionLabel: 'Browse Course Catalog',
      actionHref: '/courses',
    },
    {
      id: 'mentorship',
      icon: <GraduationCap className="w-7 h-7 text-indigo-700 dark:text-indigo-400" />,
      badge: 'Faculty Driven',
      title: 'Instructor-Led Instruction & Mentorship',
      description:
        'Direct guidance from university faculty and verified domain mentors who oversee course progression, create assignments, and review submissions with personalized feedback.',
      features: [
        'Dedicated instructor dashboards with student rosters',
        'Assignment distribution with rubric-based grading',
        'Timely constructive feedback on submitted code and projects',
        'Direct announcements and academic milestone notifications',
      ],
      actionLabel: 'Meet Our Faculty',
      actionHref: '/about',
    },
    {
      id: 'progress',
      icon: <TrendingUp className="w-7 h-7 text-emerald-700 dark:text-emerald-400" />,
      badge: 'Student Analytics',
      title: 'Student Learning-Progress Tracking',
      description:
        'Transparent, real-time analytics monitoring lesson completions, assignment submissions, grading progress, and cumulative course accomplishments.',
      features: [
        'Visual progress indicators across all active enrollments',
        'Assignment submission deadlines and points breakdown',
        'Historical grade logs with instructor feedback',
        'Consolidated performance summaries for university reporting',
      ],
      actionLabel: 'View Student Portal',
      actionHref: '/learner/dashboard',
    },
    {
      id: 'internships',
      icon: <Briefcase className="w-7 h-7 text-purple-700 dark:text-purple-400" />,
      badge: 'Career Discovery',
      title: 'Internship Discovery & Applications',
      description:
        'A vetted repository of remote, hybrid, and on-site internship opportunities posted by accredited organizations and university coordinators.',
      features: [
        'Multi-attribute filters by work mode, category, and stipend',
        'Single-click student CV and cover letter application pipeline',
        'Real-time application status tracking (Shortlisted, Accepted)',
        'Direct organizational applicant review workflows',
      ],
      actionLabel: 'Explore Internships',
      actionHref: '/internships',
    },
    {
      id: 'coordination',
      icon: <ShieldCheck className="w-7 h-7 text-amber-700 dark:text-amber-400" />,
      badge: 'Institutional Governance',
      title: 'University-Industry Coordination',
      description:
        'Specialized workflows for university internship coordinators and company employers to publish, moderate, and track student placement compliance.',
      features: [
        'Coordinator approval safeguards and institutional verification',
        'Official university compliance and credit verification',
        'Audit-logged status updates and applicant filtering',
        'Direct messaging and verified placement confirmation',
      ],
      actionLabel: 'Join as Employer',
      actionHref: '/register',
    },
    {
      id: 'career',
      icon: <Compass className="w-7 h-7 text-sky-700 dark:text-sky-400" />,
      badge: 'Professional Development',
      title: 'Career Readiness & Profile Showcase',
      description:
        'Comprehensive student digital profiles highlighting technical skills, institutional credentials, project portfolios, and uploaded CVs for hiring teams.',
      features: [
        'Personalized profile photo management and institutional bio',
        'Curriculum vitae (CV) document management with preview',
        'Saved internship bookmarking for strategic application cycles',
        'Employer-accessible candidate review directories',
      ],
      actionLabel: 'Build Your Profile',
      actionHref: '/register',
    },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* Hero Header */}
      <section className="bg-[#14532d] dark:bg-neutral-900 border-b dark:border-neutral-800 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="brand" className="bg-white dark:bg-neutral-900/10 text-brand-100 dark:text-emerald-300 border-white/20 mb-4 px-3 py-1">
            {t('publicPages.services.badge', 'Integrated University Solutions')}
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            {t('publicPages.services.title', 'Academic Excellence Connected to Real-World Internships')}
          </h1>
          <p className="text-base sm:text-lg text-brand-100/90 dark:text-neutral-300 max-w-2xl mx-auto mt-4 leading-relaxed">
            {t('publicPages.services.subtitle', 'AddisBuilder’s delivers end-to-end digital infrastructure uniting students, instructors, internship coordinators, and employer organizations in one reliable ecosystem.')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/courses">
              <Button size="lg" variant="primary" className="bg-white dark:bg-neutral-900 text-brand-950 hover:bg-brand-50 font-bold">
                {t('publicPages.home.exploreCoursesBtn', 'Explore Courses')}
              </Button>
            </Link>
            <Link to="/internships">
              <Button size="lg" variant="outline" className="border-white/30 text-black dark:text-neutral-100 hover:bg-white/10">
                {t('publicPages.home.findInternshipsBtn', 'Discover Internships')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-emerald-400">Operational Offerings</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 tracking-tight mt-1">
            Purpose-Built Services For Every Role
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            Every service is backed by active platform modules, robust role-based access, and transparent verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 p-7 shadow-xs hover:shadow-md hover:border-brand-300 dark:hover:border-emerald-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    {service.icon}
                  </div>
                  <Badge variant="neutral">{service.badge}</Badge>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{service.title}</h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">{service.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800">
                <Link to={service.actionHref} className="block">
                  <Button variant="outline" size="sm" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}>
                    {service.actionLabel}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholder Value Section */}
      <section className="bg-white dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">For University Students</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Enroll in verified coursework, master practical skills, upload resumes, and connect directly with hiring organizations offering verified internships.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">For Instructors & Mentors</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Manage syllabi, assign real-world projects, track enrolled student progress across classes, and foster career readiness with structured guidance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-neutral-900 dark:text-neutral-100">For Employers & Coordinators</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Publish vetted internship opportunities, screen candidate resumes with institutional verification, and coordinate seamlessly with academic departments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="bg-brand-900 dark:bg-neutral-900 border dark:border-neutral-800 text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Accelerate Your Academic & Career Journey?
            </h3>
            <p className="text-xs sm:text-sm text-brand-100/90 dark:text-neutral-400 leading-relaxed">
              Join students, faculty, and industry leaders already collaborating on the AddisBuilder’s University Learning & Internship Platform.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link to="/register">
                <Button size="lg" variant="primary" className="bg-white dark:bg-neutral-900 text-brand-950 hover:bg-neutral-100 font-bold">
                  {t('nav.registerNow', 'Create Free Account')}
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-black hover:bg-white/10">
                  {t('publicPages.contact.title', 'Contact Support')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { internshipSchema, InternshipFormData } from '../../schemas';
import { internshipsService } from '../../services/internships.service';
import { organizationsService } from '../../services/organizations.service';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { formatDate } from '../../utils';
import { motion } from 'framer-motion';
import {
  Save,
  ArrowLeft,
  Sparkles,
  Building2,
  MapPin,
  Clock,
  Wallet,
  Calendar,
  CheckCircle2,
  Eye,
  Briefcase,
  ShieldCheck,
  Wand2,
  Edit3,
} from 'lucide-react';
import { toast } from 'sonner';

const ROLE_PRESETS = [
  {
    label: 'Backend Spring Boot',
    title: 'Junior Backend Software Engineering Intern',
    category: 'Software Development',
    stipend: 'ETB 10,000 / month',
    description:
      'Join our core platform engineering team to design, build, and maintain scalable RESTful microservices using Java and Spring Boot. You will work directly with senior architects on production APIs, authentication pipelines, and relational database optimization.',
    responsibilities:
      'Design and implement modular REST APIs in Spring Boot\nWrite unit and integration tests for core backend services\nParticipate in sprint planning, code reviews, and API documentation',
    requirements:
      '3rd or 4th-year Software Engineering or Computer Science student\nSolid foundation in Java, OOP, and relational databases (MySQL/PostgreSQL)\nFamiliarity with Git workflows and RESTful design principles',
  },
  {
    label: 'Full-Stack React/TS',
    title: 'Full-Stack Web Application Intern (React & TypeScript)',
    category: 'Software Development',
    stipend: 'ETB 9,500 / month',
    description:
      'Collaborate with product designers and frontend engineers to build responsive, accessible web interfaces using React, TypeScript, and Tailwind CSS while integrating cleanly with backend services.',
    responsibilities:
      'Build reusable UI components in React and TypeScript\nIntegrate frontend state with REST API endpoints\nOptimize page load performance and mobile responsiveness',
    requirements:
      'Strong grasp of HTML, CSS, JavaScript/TypeScript, and React\nExperience with Git and modern frontend build tools\nPortfolio or GitHub projects demonstrating full-stack development',
  },
  {
    label: 'Data & Systems Analyst',
    title: 'Enterprise Systems & Data Analytics Intern',
    category: 'Data Science & Analytics',
    stipend: 'ETB 8,500 / month',
    description:
      'Support institutional data pipelines, build automated reporting dashboards, and assist in analyzing operational metrics across partner departments.',
    responsibilities:
      'Clean, query, and structure datasets using SQL and Python\nBuild visual KPI dashboards for stakeholder reporting\nDocument data schemas and system integration workflows',
    requirements:
      'Strong SQL querying and data modeling fundamentals\nAnalytical mindset with attention to data accuracy\nCurrently enrolled in Software Engineering, IS, or Statistics',
  },
];

export const CoordinatorInternshipEditorPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(isEditing);

  const defaultDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema) as any,
    defaultValues: {
      organizationId: 1,
      title: '',
      category: 'Software Development',
      workMode: 'HYBRID',
      location: 'Addis Ababa',
      durationMonths: 4,
      deadline: defaultDeadline,
      status: 'PUBLISHED',
      stipend: 'ETB 9,000 / month',
      description: '',
      responsibilities:
        'Participate in team agile sprints\nDesign modular REST APIs\nCollaborate on frontend components',
      requirements:
        'Enrolled university student\nSolid foundational computer science coursework\nKnowledge of Git and JavaScript',
      eligibility: 'Open to 3rd and 4th-year university undergraduate students.',
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const orgs = await organizationsService.getPublicOrganizations();
        if (isMounted && orgs && orgs.length > 0) {
          setOrganizations(orgs);
          if (!isEditing) {
            setValue('organizationId', Number(orgs[0].id));
          }
        }

        if (isEditing && id) {
          const internship = await internshipsService.getInternshipById(id);
          if (isMounted && internship) {
            reset({
              organizationId: Number(internship.organizationId) || 1,
              title: internship.title || '',
              category: internship.category || 'Software Development',
              workMode: (internship.workMode as any) || 'HYBRID',
              location: internship.location || 'Addis Ababa',
              durationMonths: internship.durationMonths || 4,
              deadline: internship.deadline ? internship.deadline.split('T')[0] : defaultDeadline,
              status: (internship.status as any) || 'PUBLISHED',
              stipend: internship.stipend || 'ETB 9,000 / month',
              description: internship.description || '',
              responsibilities: Array.isArray(internship.responsibilities)
                ? internship.responsibilities.join('\n')
                : internship.responsibilities || '',
              requirements: Array.isArray(internship.requirements)
                ? internship.requirements.join('\n')
                : internship.requirements || '',
              eligibility: internship.eligibility || 'Open to university students.',
            });
          }
        }
      } catch (err) {
        console.error('Failed to load editor data:', err);
        toast.error('Failed to load internship details');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [id, isEditing, reset, defaultDeadline, setValue]);

  const applyPreset = (preset: (typeof ROLE_PRESETS)[number]) => {
    setValue('title', preset.title, { shouldValidate: true });
    setValue('category', preset.category, { shouldValidate: true });
    setValue('stipend', preset.stipend, { shouldValidate: true });
    setValue('description', preset.description, { shouldValidate: true });
    setValue('responsibilities', preset.responsibilities, { shouldValidate: true });
    setValue('requirements', preset.requirements, { shouldValidate: true });
    toast.success(`Applied "${preset.label}" template! ✨`);
  };

  const setQuickDeadline = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setValue('deadline', d.toISOString().split('T')[0], { shouldValidate: true });
  };

  const onSubmit = async (data: InternshipFormData) => {
    const responsibilitiesArr = (data.responsibilities || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const requirementsArr = (data.requirements || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const selectedOrg = organizations.find((o) => String(o.id) === String(data.organizationId));
      const orgIdNumber = Number(data.organizationId || 1);

      const payload: any = {
        ...data,
        status: data.status === 'PENDING_REVIEW' ? 'PUBLISHED' : data.status,
        organizationId: orgIdNumber,
        organizationName:
          selectedOrg?.name || `${user?.university || 'University Linkage'} Partner Organization`,
        responsibilities: responsibilitiesArr,
        requirements: requirementsArr,
        postedById: user?.id || '',
        postedByRole: 'INTERNSHIP_COORDINATOR',
      };

      if (isEditing && id) {
        await internshipsService.updateInternship(id, payload);
        toast.success('Internship listing updated successfully! ✨');
      } else {
        await internshipsService.createInternship(payload);
        toast.success(
          data.status === 'PUBLISHED'
            ? 'University internship opportunity published! 🚀'
            : 'Internship saved as draft.'
        );
      }
      navigate('/internship-manager/internships');
    } catch (err: any) {
      console.error('Submission error:', err?.response?.data);
      toast.error(err?.response?.data?.message || 'Failed to save internship listing');
    }
  };

  const organizationOptions =
    organizations.length > 0
      ? organizations.map((org) => ({
          value: String(org.id),
          label: `${org.name} (ID: ${org.id})`,
        }))
      : [{ value: '1', label: 'BITS College Industry Linkage (ID: 1)' }];

  const categoryOptions = INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c }));
  const workModeOptions = WORK_MODES.map((w) => (typeof w === 'string' ? { value: w, label: w } : w));
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published (Live to Students)' },
    { value: 'DRAFT', label: 'Draft (Hidden)' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  const previewResponsibilities = (watchedValues.responsibilities || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const currentSelectedOrg = organizations.find(
    (o) => String(o.id) === String(watchedValues.organizationId)
  );
  const orgDisplayName =
    currentSelectedOrg?.name || `${user?.university || 'University Linkage'} Partner Organization`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand-700 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-neutral-500">Loading internship editor...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-7xl mx-auto pb-20 relative overflow-hidden"
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-24 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="space-y-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-6 relative z-10">
        <Link
          to="/internship-manager/internships"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-brand-800 transition-colors bg-white dark:bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Listings
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
              <span>University Linkage Desk</span>
              <span>/</span>
              <span>Internships</span>
              <span>/</span>
              <span className="text-brand-700 font-bold">
                {isEditing ? 'Edit Listing' : 'New Listing'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-100 tracking-tight">
                {isEditing ? 'Update Accredited Internship' : 'Publish Accredited Internship'}
              </h1>
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200/80 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {isEditing ? (
                  <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                )}
                {isEditing ? 'Editing Mode' : 'Institutional Placement'}
              </motion.div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-500 max-w-2xl">
              {isEditing
                ? 'Modify placement specifications and publishing parameters for verified university learners.'
                : 'Author an institutional internship placement listing for verified university learners.'}
            </p>
          </div>

          {!isEditing && (
            <div className="flex flex-wrap items-center gap-2 bg-neutral-50/90 dark:bg-neutral-800/60 p-2 rounded-2xl border border-neutral-200/80 dark:border-neutral-800">
              <span className="text-[11px] font-bold text-neutral-500 flex items-center gap-1 px-2">
                <Wand2 className="w-3.5 h-3.5 text-brand-700" /> Quick Templates:
              </span>
              {ROLE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-brand-50 text-neutral-700 dark:text-neutral-300 hover:text-brand-800 text-xs font-bold border border-neutral-200 dark:border-neutral-800 hover:border-brand-300 transition-all shadow-xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <div className="lg:col-span-7">
          <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 shadow-xs">
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                    <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center text-xs font-black">
                      1
                    </span>
                    <h2 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                      Partner Organization & Role
                    </h2>
                  </div>

                  <Select
                    label="Host Partner Organization"
                    options={organizationOptions}
                    {...register('organizationId')}
                    error={errors.organizationId?.message}
                    required
                  />

                  <Input
                    label="Internship Position Title"
                    placeholder="e.g. Junior Systems Integration Intern"
                    {...register('title')}
                    error={errors.title?.message}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Select
                      label="Category"
                      options={categoryOptions}
                      {...register('category')}
                      error={errors.category?.message}
                      required
                    />
                    <Select
                      label="Work Mode"
                      options={workModeOptions}
                      {...register('workMode')}
                      error={errors.workMode?.message}
                      required
                    />
                    <Input
                      label="Location / Campus"
                      placeholder="e.g. Addis Ababa (Kazanchis)"
                      {...register('location')}
                      error={errors.location?.message}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Duration (Months)"
                      type="number"
                      min={1}
                      max={24}
                      {...register('durationMonths')}
                      error={errors.durationMonths?.message}
                      required
                    />

                    <div className="space-y-1">
                      <Input
                        label="Application Deadline"
                        type="date"
                        {...register('deadline')}
                        error={errors.deadline?.message}
                        required
                      />
                      <div className="flex items-center gap-1 pt-1">
                        {[
                          { label: '+2w', days: 14 },
                          { label: '+1m', days: 30 },
                          { label: '+2m', days: 60 },
                        ].map((chip) => (
                          <button
                            key={chip.label}
                            type="button"
                            onClick={() => setQuickDeadline(chip.days)}
                            className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-brand-50 text-neutral-600 dark:text-neutral-400 hover:text-brand-800 text-[10px] font-bold transition-colors"
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Input
                        label="Monthly Stipend"
                        placeholder="e.g. ETB 10,000 / month"
                        {...register('stipend')}
                        error={errors.stipend?.message}
                      />
                      <div className="flex items-center gap-1 pt-1">
                        {['ETB 8,000 / mo', 'ETB 12,000 / mo', 'Academic Credit'].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setValue('stipend', amt, { shouldValidate: true })}
                            className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-emerald-50 text-neutral-600 dark:text-neutral-400 hover:text-emerald-800 text-[10px] font-bold transition-colors truncate"
                          >
                            {amt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
                    <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-800 flex items-center justify-center text-xs font-black">
                      2
                    </span>
                    <h2 className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                      Scope & Eligibility Criteria
                    </h2>
                  </div>

                  <Textarea
                    label="Full Description"
                    placeholder="Detailed description of the internship role, team environment, and mentorship support..."
                    rows={4}
                    {...register('description')}
                    error={errors.description?.message}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Textarea
                      label="Responsibilities (One per line)"
                      rows={4}
                      {...register('responsibilities')}
                      error={errors.responsibilities?.message}
                      required
                    />

                    <Textarea
                      label="Requirements (One per line)"
                      rows={4}
                      {...register('requirements')}
                      error={errors.requirements?.message}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <Input
                        label="Institutional Eligibility"
                        placeholder="e.g. 3rd or 4th-year university undergraduate students with GPA 3.0+"
                        {...register('eligibility')}
                        error={errors.eligibility?.message}
                        required
                      />
                    </div>
                    <Select
                      label="Listing Visibility"
                      options={statusOptions}
                      {...register('status')}
                      error={errors.status?.message}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-5 border-t border-neutral-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/internship-manager/internships')}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                      leftIcon={<Save className="w-4 h-4" />}
                      className="font-extrabold bg-gradient-to-r from-brand-800 to-emerald-700 hover:from-brand-900 hover:to-emerald-800 text-white shadow-md shadow-brand-900/20 border-0"
                    >
                      {isEditing
                        ? 'Save Changes ✨'
                        : watchedValues.status === 'DRAFT'
                        ? 'Save Draft'
                        : 'Publish Opportunity 🚀'}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-6 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-brand-700" /> Live Student Marketplace Preview
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3" /> Real-Time Sync
            </span>
          </div>

          <Card className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200/90 dark:border-neutral-800 shadow-lg overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-brand-700 via-emerald-600 to-teal-500" />
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200/60">
                  {watchedValues.category || 'Software Development'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg">
                    {watchedValues.workMode || 'HYBRID'}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                      watchedValues.status === 'PUBLISHED'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {watchedValues.status || 'PUBLISHED'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-100 leading-snug">
                  {watchedValues.title?.trim() || 'Untitled Internship Position'}
                </h3>
                <p className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{orgDisplayName}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate font-medium">
                    {watchedValues.location || 'Addis Ababa'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="font-medium">{watchedValues.durationMonths || 4} Months</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <Wallet className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{watchedValues.stipend || 'Stipend TBD'}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate font-medium">
                    Due {watchedValues.deadline ? formatDate(watchedValues.deadline) : 'TBD'}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  Role Overview
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                  {watchedValues.description?.trim() ||
                    'Your role description will appear here as you type...'}
                </p>
              </div>

              {previewResponsibilities.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Key Responsibilities
                  </p>
                  <ul className="space-y-1.5">
                    {previewResponsibilities.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5 truncate">
                  <Briefcase className="w-3.5 h-3.5 text-brand-700 shrink-0" />
                  <span className="truncate">{watchedValues.eligibility || 'University Students'}</span>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { internshipSchema, InternshipFormData } from '../../schemas';
import { internshipsService } from '../../services/internships.service';
import { organizationsService } from '../../services/organizations.service';
import { useAuth } from '../../contexts/AuthContext';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { INTERNSHIP_CATEGORIES, WORK_MODES } from '../../constants';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerInternshipEditorPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InternshipFormData>({
    resolver: zodResolver(internshipSchema) as any,
    defaultValues: {
      category: 'Frontend Engineering',
      workMode: 'HYBRID',
      durationMonths: 6,
      status: 'PUBLISHED',
      stipend: 'ETB 11,000 / month',
      responsibilities: 'Develop modern responsive web features in React and TypeScript\nIntegrate REST endpoints with JSON payloads\nParticipate in agile sprint ceremonies',
      requirements: 'Enrolled in Computer Science or Software Engineering\nExperience with modern JavaScript / React\nGood communication and collaborative spirit',
      eligibility: 'Open to undergraduate university students graduating in 2026 or 2027.',
    },
  });

  const onSubmit = async (data: InternshipFormData) => {
    const responsibilitiesArr = data.responsibilities.split('\n').map((s) => s.trim()).filter(Boolean);
    const requirementsArr = data.requirements.split('\n').map((s) => s.trim()).filter(Boolean);

    try {
      const myOrg = await organizationsService.getMyOrganization();

      await internshipsService.createInternship({
        ...data,
        organizationId: myOrg.id,
        organizationName: myOrg.name,
        responsibilities: responsibilitiesArr,
        requirements: requirementsArr,
        postedById: user?.id || 'user-employer-1',
        postedByRole: 'EMPLOYER',
      });

      toast.success('Internship listing published successfully!');
      navigate('/employer/internships');
    } catch {
      toast.error('Failed to create internship');
    }
  };

  const categoryOptions = INTERNSHIP_CATEGORIES.map((c) => ({ value: c, label: c }));
  const workModeOptions = WORK_MODES;
  const statusOptions = [
    { value: 'PUBLISHED', label: 'Published' },
    { value: 'DRAFT', label: 'Draft' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/employer/internships"
        className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-brand-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Listings
      </Link>

      <PageHeader
        title="Publish Employer Internship"
        description="Create an industry-ready internship opening for qualified university students."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'My Internships', href: '/employer/internships' },
          { label: 'New Listing' },
        ]}
      />

      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Internship Position Title"
              placeholder="e.g. Junior Cloud Infrastructure Engineer Intern"
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
                label="Work Arrangement"
                options={workModeOptions}
                {...register('workMode')}
                error={errors.workMode?.message}
                required
              />
              <Input
                label="Office Location / City"
                placeholder="e.g. Addis Ababa (Bole Medhanealem)"
                {...register('location')}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Program Duration (Months)"
                type="number"
                min={1}
                max={24}
                {...register('durationMonths')}
                error={errors.durationMonths?.message}
                required
              />
              <Input
                label="Application Deadline"
                type="date"
                {...register('deadline')}
                error={errors.deadline?.message}
                required
              />
              <Input
                label="Monthly Stipend / Allowance"
                placeholder="e.g. ETB 12,000 / month"
                {...register('stipend')}
                error={errors.stipend?.message}
              />
            </div>

            <Textarea
              label="Comprehensive Job Description"
              placeholder="Describe the projects the intern will contribute to, mentorship available, and technologies used..."
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <Textarea
              label="Key Responsibilities (One per line)"
              rows={3}
              {...register('responsibilities')}
              error={errors.responsibilities?.message}
              required
            />

            <Textarea
              label="Candidate Requirements (One per line)"
              rows={3}
              {...register('requirements')}
              error={errors.requirements?.message}
              required
            />

            <Input
              label="University Eligibility Criteria"
              placeholder="e.g. 3rd or 4th-year university undergraduate students with GPA 3.0+"
              {...register('eligibility')}
              error={errors.eligibility?.message}
              required
            />

            <div className="flex gap-3 justify-end pt-3 border-t border-neutral-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/employer/internships')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Publish Internship
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

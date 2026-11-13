import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationProfileSchema, OrganizationProfileFormData } from '../../schemas';
import { organizationsService } from '../../services/organizations.service';
import { Organization } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { Save, Building2, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerProfilePage: React.FC = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
  });

  useEffect(() => {
    organizationsService.getMyOrganization().then((data) => {
      setOrg(data);
      reset({
        name: data.name,
        industry: data.industry,
        description: data.description,
        website: data.website,
        location: data.location,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        registrationNumber: data.registrationNumber || '',
        taxId: data.taxId || '',
      });
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = async (data: OrganizationProfileFormData) => {
    try {
      const updated = await organizationsService.updateMyOrganization(data);
      setOrg(updated);
      toast.success('Organization profile updated successfully!');
    } catch {
      toast.error('Failed to update organization profile');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading organization profile..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Organization Profile"
        description="Maintain corporate identity, industry classifications, and official contact channels."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Organization Profile' },
        ]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
      />

      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Organization Legal Name"
                placeholder="e.g. Brolf Technologies"
                {...register('name')}
                error={errors.name?.message}
                required
              />
              <Input
                label="Primary Industry"
                placeholder="e.g. Software & Cloud Solutions"
                {...register('industry')}
                error={errors.industry?.message}
                required
              />
            </div>

            <Textarea
              label="Corporate Overview & Mission"
              placeholder="Describe your company, engineering squad, and technological focus..."
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Website URL"
                placeholder="https://company.example.com"
                {...register('website')}
                error={errors.website?.message}
                required
              />
              <Input
                label="Headquarters Location"
                placeholder="e.g. Addis Ababa, Bole, Ethiopia"
                {...register('location')}
                error={errors.location?.message}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Recruitment Contact Email"
                type="email"
                placeholder="careers@company.example.com"
                {...register('contactEmail')}
                error={errors.contactEmail?.message}
                required
              />
              <Input
                label="Direct Contact Phone"
                placeholder="+251 11 661 2345"
                {...register('contactPhone')}
                error={errors.contactPhone?.message}
                required
              />
            </div>

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Organization Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

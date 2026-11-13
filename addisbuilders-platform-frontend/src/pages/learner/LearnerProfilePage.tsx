import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileSchema, UserProfileFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { usersService } from '../../services/users.service';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { ProfilePhotoUploader } from '../../components/ui/ProfilePhotoUploader';
import { getInitials } from '../../utils';
import { Save, UserCheck, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const LearnerProfilePage: React.FC = () => {
  const { user, updateCurrentUser } = useAuth();
  const [cvUrl, setCvUrl] = useState(user?.cvUrl || '');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      university: user?.university || '',
      department: user?.department || '',
      studentId: user?.studentId || '',
      cvUrl: user?.cvUrl || '',
    },
  });

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      const updated = await usersService.updateProfile({ ...data, cvUrl });
      updateCurrentUser(updated);
      toast.success('Profile information updated successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Student Profile & CV"
        description="Manage your institutional contact information, academic biography, and resume for employers."
        breadcrumbs={[
          { label: 'Learner', href: '/learner/dashboard' },
          { label: 'Profile' },
        ]}
      />

      {/* Profile Photo Management */}
      <ProfilePhotoUploader
        currentAvatarUrl={user?.avatarUrl}
        userName={user?.fullName || 'Student'}
      />

      <Card className="bg-white dark:bg-neutral-900">
        <CardContent className="p-6 sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Legal Name"
                {...register('fullName')}
                error={errors.fullName?.message}
                required
              />
              <Input
                label="Phone Number"
                placeholder="+251 91 123 4567"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>

            <Textarea
              label="Bio / Career Summary"
              placeholder="Brief summary of your learning goals, technical interests, and projects..."
              rows={3}
              {...register('bio')}
              error={errors.bio?.message}
            />

            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Academic Affiliation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="University"
                  placeholder="e.g. Addis Ababa University"
                  {...register('university')}
                />
                <Input
                  label="Department / Faculty"
                  placeholder="e.g. Computer Science"
                  {...register('department')}
                />
                <Input
                  label="Student ID"
                  placeholder="e.g. AAU/CS/2023/042"
                  {...register('studentId')}
                />
              </div>
            </div>

            {/* CV Upload */}
            <div className="p-4 bg-brand-50/50 rounded-xl border border-brand-200 space-y-3">
              <h3 className="text-xs font-semibold text-brand-900 uppercase tracking-wider">
                Resume / Curriculum Vitae
              </h3>
              <FileUpload
                purpose="CV"
                accept=".pdf,.doc,.docx"
                currentFileName={cvUrl ? 'Abebe_Kebede_Resume_2026.pdf' : undefined}
                onUploadSuccess={(res) => setCvUrl(res.url)}
                helperText="Upload your latest PDF CV. This document will be attached to your internship applications."
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

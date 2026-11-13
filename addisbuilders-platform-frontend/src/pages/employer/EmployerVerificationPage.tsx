import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { organizationVerificationSchema, OrganizationVerificationFormData } from '../../schemas';
import { organizationsService } from '../../services/organizations.service';
import { Organization } from '../../types';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { FileUpload } from '../../components/ui/FileUpload';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDate } from '../../utils';
import { ShieldCheck, FileCheck, AlertCircle, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const EmployerVerificationPage: React.FC = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [docUrl, setDocUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationVerificationFormData>({
    resolver: zodResolver(organizationVerificationSchema),
  });

  const loadOrg = async () => {
    try {
      const data = await organizationsService.getMyOrganization();
      setOrg(data);
      if (data.registrationNumber) setValue('registrationNumber', data.registrationNumber);
      if (data.taxId) setValue('taxId', data.taxId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrg();
  }, [setValue]);

  const onSubmit = async (data: OrganizationVerificationFormData) => {
    try {
      const updated = await organizationsService.submitVerification({
        registrationNumber: data.registrationNumber,
        taxId: data.taxId,
        documentName: data.documentName,
        documentUrl: docUrl || data.documentUrl,
      });

      setOrg(updated);
      toast.success('Verification package submitted for Super Admin review!');
      reset();
    } catch {
      toast.error('Failed to submit verification');
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" label="Loading compliance and verification records..." />;
  }

  const isVerified = org?.verificationStatus === 'APPROVED' || org?.verificationStatus === 'VERIFIED';
  const isPending = org?.verificationStatus === 'PENDING';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Organization Compliance & Verification"
        description="Verify corporate legitimacy by submitting official Ethiopian trade licenses, tax clearance, and TIN certifications."
        breadcrumbs={[
          { label: 'Employer', href: '/employer/dashboard' },
          { label: 'Verification' },
        ]}
        badge={<StatusBadge status={org?.verificationStatus || 'UNVERIFIED'} />}
      />

      {/* Current Status Box */}
      <div
        className={`p-6 rounded-2xl border ${
          isVerified
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : isPending
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-neutral-50 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100'
        }`}
      >
        <div className="flex items-start gap-3">
          {isVerified ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : isPending ? (
            <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-neutral-500 shrink-0 mt-0.5" />
          )}

          <div className="space-y-1">
            <h3 className="font-bold text-base">
              {isVerified
                ? 'Accredited & Verified Corporate Partner'
                : isPending
                ? 'Verification Package Under Administrative Review'
                : 'Verification Documents Required'}
            </h3>
            <p className="text-xs leading-relaxed opacity-90">
              {isVerified
                ? 'Your organization has been officially vetted by AddisBuilder’s Super Administrators. Your internship listings will carry the verified partner trust badge.'
                : isPending
                ? 'Your documentation has been dispatched to the platform compliance office. Decisions are normally rendered within 24–48 hours.'
                : 'To protect university students and guarantee accredited placements, all employers must submit business registration and TIN proofs before publishing live internships.'}
            </p>
          </div>
        </div>
      </div>

      {/* Submitted Documents History */}
      <Card className="bg-white dark:bg-neutral-900">
        <CardHeader>
          <CardTitle>Archived Compliance Documents ({org?.documents?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {org?.documents && org.documents.length > 0 ? (
            <div className="space-y-2.5">
              {org.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-neutral-200/90 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-800/60"
                >
                  <div className="flex items-center gap-3">
                    <FileCheck className="w-5 h-5 text-brand-700" />
                    <div>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm">{doc.name}</p>
                      <p className="text-[11px] text-neutral-400">
                        Type: {doc.type} • Uploaded: {formatDate(doc.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-brand-800 font-semibold">Verified File</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-neutral-500 italic">No verification documents on file yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Submit Verification Form */}
      <Card className="bg-white dark:bg-neutral-900">
        <CardHeader>
          <CardTitle>Submit / Update Verification Package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Commercial Registration Number"
                placeholder="e.g. ETH-MINT-2023-8849"
                {...register('registrationNumber')}
                error={errors.registrationNumber?.message}
                required
              />
              <Input
                label="Tax Identification Number (TIN)"
                placeholder="e.g. TIN-0092837411"
                {...register('taxId')}
                error={errors.taxId?.message}
                required
              />
            </div>

            <Input
              label="Document Title"
              placeholder="e.g. Official Business Trade License 2025/2026"
              {...register('documentName')}
              error={errors.documentName?.message}
              required
            />

            <FileUpload
              label="Verification Proof File (PDF / Image)"
              purpose="VERIFICATION_DOC"
              accept=".pdf,.png,.jpg,.jpeg"
              onUploadSuccess={(res) => {
                setDocUrl(res.url);
                setValue('documentUrl', res.url);
              }}
              error={errors.documentUrl?.message}
              helperText="Upload official certificate of incorporation, trade license, or tax clearance document."
            />

            <Textarea
              label="Additional Compliance Notes (Optional)"
              placeholder="Any additional information or university MOU linkage notes..."
              rows={3}
              {...register('notes')}
            />

            <div className="flex justify-end pt-3 border-t border-neutral-100">
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Send className="w-4 h-4" />}
              >
                Submit Documents for Review
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../schemas';
import { authService } from '../../services/auth.service';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export const ForgotPasswordPage: React.FC = () => {
  const { t } = useLanguage();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const res = await authService.forgotPassword(data.email);
      setSuccessMessage(res.message);
      toast.success('Password reset instructions dispatched.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to dispatch reset request');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {t('auth.forgotPasswordTitle', 'Reset Password')}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {t('auth.forgotPasswordSubtitle', 'Enter your registered email address to receive password recovery instructions.')}
        </p>
      </div>

      {successMessage ? (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed font-medium">{successMessage}</p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="primary" size="sm" className="w-full">
                {t('auth.backToLogin', 'Back to Sign In')}
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label={t('auth.emailLabel', 'Email Address')}
            type="email"
            placeholder={t('auth.emailPlaceholder', 'your.email@university.edu')}
            {...register('email')}
            error={errors.email?.message}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
            leftIcon={<Mail className="w-4 h-4" />}
          >
            {t('auth.sendResetLink', 'Send Reset Link')}
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-brand-800 dark:text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1 rtl:mr-0 rtl:ml-1 rtl:rotate-180" />
          {t('auth.backToLogin', 'Return to Sign In')}
        </Link>
      </div>
    </div>
  );
};

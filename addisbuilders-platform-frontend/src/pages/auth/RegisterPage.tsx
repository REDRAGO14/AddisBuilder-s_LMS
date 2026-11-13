import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { registerSchema, RegisterFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Eye, EyeOff, UserPlus, Info, ShieldCheck } from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { toast } from 'sonner';

export const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || searchParams.get('returnUrl');
  const from = (location.state as any)?.from?.pathname || (location.state as any)?.from || redirectParam;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'LEARNER',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null);

    try {
      const user = await registerUser(data);

      toast.success(
        `Account registered successfully as ${USER_ROLES[user.role]?.label}!`
      );

      if (user.role === 'INTERNSHIP_COORDINATOR') {
        navigate('/coordinator-pending', { replace: true });
        return;
      }

      if (from && user.role === 'LEARNER') {
        navigate(from, { replace: true });
        return;
      }

      const defaultPath =
        USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';

      navigate(defaultPath, { replace: true });

    } catch (err: any) {
      console.error('Registration error:', err.response?.data || err);

      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        err.response?.data?.error ||
        err.message;

      setAuthError(
        backendMessage || 'Registration failed. Please verify your information.'
      );
    }
  };

  const roleOptions = [
    { value: 'LEARNER', label: 'Student / Learner' },
    { value: 'MENTOR', label: 'Mentor / Faculty Instructor' },
    { value: 'INTERNSHIP_COORDINATOR', label: 'Internship Coordinator' },
    { value: 'EMPLOYER', label: 'Organization / Employer' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {t('auth.registerTitle', 'Create an Account')}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {t('auth.registerSubtitle', 'Join the AddisBuilder’s university learning and internship platform.')}
        </p>
      </div>

      {authError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 font-medium">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t('auth.fullNameLabel', 'Full Legal Name')}
          placeholder="e.g. Abebe Kebede"
          {...register('fullName')}
          error={errors.fullName?.message}
          required
        />

        <Input
          label={t('auth.emailLabel', 'Email Address')}
          type="email"
          placeholder="your.email@university.edu"
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <Select
          label={t('auth.roleLabel', 'I am joining as')}
          options={roleOptions}
          {...register('role')}
          error={errors.role?.message}
          required
        />

        {/* Role-specific conditional guidance and fields */}
        {selectedRole === 'MENTOR' && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 space-y-3">
            <div className="flex items-start gap-2 text-xs text-blue-900 dark:text-blue-300">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-blue-700 dark:text-blue-400" />
              <span>
                Mentor accounts require institutional details and may need approval
                before accessing mentor features.
              </span>
            </div>

            <Input
              label={t('auth.universityLabel', 'University / Institution')}
              placeholder="e.g. BITS College"
              {...register('university')}
            />

            <Input
              label={t('auth.departmentLabel', 'Department')}
              placeholder="e.g. Software Engineering"
              {...register('department')}
            />

            <Input
              label={t('auth.employeeIdLabel', 'Employee / Staff ID')}
              placeholder="e.g. BITS/STAFF/001"
              {...register('employeeId')}
            />

            <Input
              label="Proof Document URL"
              placeholder="https://example.com/mentor-proof.pdf"
              {...register('proofDocumentUrl')}
              error={errors.proofDocumentUrl?.message}
            />
          </div>
        )}

        {selectedRole === 'LEARNER' && (
          <div className="p-3 bg-brand-50/60 dark:bg-brand-950/40 rounded-xl border border-brand-200/80 dark:border-brand-800 space-y-3">
            <div className="flex items-start gap-2 text-xs text-brand-900 dark:text-emerald-300">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-brand-700 dark:text-emerald-400" />
              <span>Provide your university details to unlock enrolled coursework and internships.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label={t('auth.universityLabel', 'University')}
                placeholder="e.g. Addis Ababa University"
                {...register('university')}
              />
              <Input
                label={t('auth.departmentLabel', 'Department')}
                placeholder="e.g. Computer Science"
                {...register('department')}
              />
            </div>
            <Input
              label={t('auth.studentIdLabel', 'Student ID Number')}
              placeholder="e.g. AAU/CS/2023/042"
              {...register('studentId')}
            />
          </div>
        )}

        {selectedRole === 'INTERNSHIP_COORDINATOR' && (
          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-3">
            <div className="flex items-start gap-2 text-xs text-purple-900 dark:text-purple-300">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-purple-700 dark:text-purple-400" />
              <span>
                <strong>Approval Required:</strong> Institutional coordinator accounts must be approved by the Super Admin before posting listings.
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label={t('auth.universityLabel', 'University / Institution')}
                placeholder="e.g. Addis Ababa Institute of Technology"
                {...register('university')}
              />
              <Input
                label={t('auth.employeeIdLabel', 'Employee / Staff ID')}
                placeholder="e.g. AAU/STAFF/771"
                {...register('employeeId')}
              />
            </div>
          </div>
        )}

        {selectedRole === 'EMPLOYER' && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-300">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
              <span>
                <strong>Verification Required:</strong> Organizations must submit business registration and TIN proofs before publishing live internships.
              </span>
            </div>
            <Input
              label="Organization Legal Name"
              placeholder="e.g. Brolf Technologies"
              {...register('organizationName')}
            />
          </div>
        )}

        {/* Passwords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label={t('auth.passwordLabel', 'Password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Min 6 chars"
            {...register('password')}
            error={errors.password?.message}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />

          <Input
            label={t('auth.confirmPasswordLabel', 'Confirm Password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="w-4 h-4 rtl:rotate-180" />}
        >
          {t('auth.registerButton', 'Create Account')}
        </Button>
      </form>

      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
        {t('auth.haveAccountPrompt', 'Already have an account?')}{' '}
        <Link to="/login" className="font-semibold text-brand-800 dark:text-emerald-400 hover:underline">
          {t('auth.signInButton', 'Sign in here')}
        </Link>
      </div>
    </div>
  );
};

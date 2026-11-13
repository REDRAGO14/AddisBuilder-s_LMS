import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../../schemas';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { USER_ROLES } from '../../constants';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect') || searchParams.get('returnUrl');
  const from = (location.state as any)?.from?.pathname || (location.state as any)?.from || redirectParam;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    try {
      const user = await login(data);
      toast.success(`${t('dashboards.learner.welcome', 'Welcome back')}, ${user.fullName}!`);

      if (from) {
        navigate(from, { replace: true });
        return;
      }

      // Role-based redirect
      const defaultPath = USER_ROLES[user.role]?.defaultPath || '/learner/dashboard';
      navigate(defaultPath, { replace: true });
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleQuickDemoLogin = (email: string) => {
    setValue('email', email);
    setValue('password', 'password123');
    handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          {t('auth.loginTitle', 'Sign In to AddisBuilder’s')}
        </h2>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
          {t('auth.loginSubtitle', 'Access your courses, assignments, and verified internship portals.')}
        </p>
      </div>

      {from && (
        <div className="p-3.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-emerald-300 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-700 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Authentication Required</p>
            <p className="text-[11px] text-brand-800 dark:text-emerald-400/90 mt-0.5">
              Please sign in with your student account to complete enrollment or internship applications. You will be redirected back automatically upon signing in.
            </p>
          </div>
        </div>
      )}

      {authError && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 font-medium">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={t('auth.emailLabel', 'Email Address')}
          type="email"
          placeholder={t('auth.emailPlaceholder', 'your.email@university.edu')}
          {...register('email')}
          error={errors.email?.message}
          required
        />

        <div className="space-y-1">
          <Input
            label={t('auth.passwordLabel', 'Password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message}
            required
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <div className="flex justify-end pt-1">
            <Link
              to="/forgot-password"
              className="text-xs text-brand-800 dark:text-emerald-400 hover:underline font-medium"
            >
              {t('auth.forgotPasswordLink', 'Forgot password?')}
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          isLoading={isSubmitting}
          leftIcon={<LogIn className="w-4 h-4 rtl:rotate-180" />}
        >
          {t('auth.signInButton', 'Sign In')}
        </Button>
      </form>

      {/* Demo Fast Login Box */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-700 dark:text-emerald-400" />
          <span>One-Click Demo Personas</span>
        </div>
        <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
          Click any role below to prefill and log in instantly:
        </p>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('learner@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/40 hover:bg-emerald-100/60 dark:hover:bg-emerald-900/50 text-xs font-medium text-emerald-900 dark:text-emerald-300 transition-colors"
          >
            🎓 Student Learner
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('mentor@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/40 hover:bg-blue-100/60 dark:hover:bg-blue-900/50 text-xs font-medium text-blue-900 dark:text-blue-300 transition-colors"
          >
            👨‍🏫 Faculty Mentor
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('coordinator@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/40 hover:bg-purple-100/60 dark:hover:bg-purple-900/50 text-xs font-medium text-purple-900 dark:text-purple-300 transition-colors"
          >
            🏛️ Approved Coordinator
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('pending.coordinator@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/40 hover:bg-amber-100/60 dark:hover:bg-amber-900/50 text-xs font-medium text-amber-900 dark:text-amber-300 transition-colors"
          >
            ⏳ Pending Coordinator
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('employer@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/40 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/50 text-xs font-medium text-indigo-900 dark:text-indigo-300 transition-colors"
          >
            🏢 Tech Employer
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemoLogin('admin@addisbuilder.edu')}
            className="text-left rtl:text-right p-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/40 hover:bg-rose-100/60 dark:hover:bg-rose-900/50 text-xs font-medium text-rose-900 dark:text-rose-300 transition-colors"
          >
            🛡️ Super Admin
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-neutral-500 dark:text-neutral-400 pt-2">
        {t('auth.noAccountPrompt', 'Don’t have an account?')}{' '}
        <Link to="/register" className="font-semibold text-brand-800 dark:text-emerald-400 hover:underline">
          {t('auth.registerButton', 'Register here')}
        </Link>
      </div>
    </div>
  );
};

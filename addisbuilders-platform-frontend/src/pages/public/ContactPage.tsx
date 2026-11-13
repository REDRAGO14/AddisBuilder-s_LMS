import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '../../schemas';
import { PageHeader } from '../../components/common/PageHeader';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate contact form submission
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmitted(true);
    toast.success(t('publicPages.contact.successMessage', 'Your message has been received! Our support team will respond shortly.'));
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <PageHeader
        title={t('publicPages.contact.title', 'Contact AddisBuilder’s Support')}
        description={t('publicPages.contact.subtitle', 'Have questions regarding university linkage, employer verification, or course participation? We are here to help.')}
        breadcrumbs={[{ label: t('nav.home', 'Home'), href: '/' }, { label: t('nav.contact', 'Contact') }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{t('publicPages.contact.badge', 'Get in Touch')}</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Reach our academic relations and technical support desk during university business hours.
            </p>

            <div className="space-y-3 pt-2 text-xs text-neutral-600 dark:text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('publicPages.contact.officeAddress', 'Addis Ababa, Bole Sub-City, Ethiopia')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-800 dark:text-emerald-400 shrink-0" />
                <span>{t('publicPages.contact.supportEmail', 'support@addisbuilder.edu')}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-800 dark:text-emerald-400 shrink-0" />
                <span>{t('publicPages.contact.supportPhone', '+251 11 661 2345')}</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-50/70 dark:bg-brand-950/40 p-6 rounded-2xl border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-emerald-300 space-y-2">
            <h3 className="font-bold text-sm">Institutional Coordination</h3>
            <p className="leading-relaxed">
              For university departments wishing to establish official internship linkage programs, please select "Internship Coordinator" during registration.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 dark:border-neutral-800 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Message Delivered</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out. A platform coordinator will review your inquiry and follow up within one business day.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t('publicPages.contact.nameLabel', 'Your Name')}
                    placeholder="e.g. Abebe Kebede"
                    {...register('name')}
                    error={errors.name?.message}
                    required
                  />
                  <Input
                    label={t('publicPages.contact.emailLabel', 'Email Address')}
                    type="email"
                    placeholder="e.g. abebe@aau.edu"
                    {...register('email')}
                    error={errors.email?.message}
                    required
                  />
                </div>

                <Input
                  label={t('publicPages.contact.subjectLabel', 'Subject')}
                  placeholder="Inquiry regarding course enrollment / internship listing"
                  {...register('subject')}
                  error={errors.subject?.message}
                  required
                />

                <Textarea
                  label={t('publicPages.contact.messageLabel', 'Message')}
                  placeholder="Please describe your question or request in detail..."
                  rows={5}
                  {...register('message')}
                  error={errors.message?.message}
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4 rtl:rotate-180" />}
                  >
                    {t('publicPages.contact.sendButton', 'Send Message')}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { GraduationCap, Award, ShieldCheck, Users } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <PageHeader
        title={t('publicPages.about.title', 'About AddisBuilder’s')}
        description={t('publicPages.about.subtitle', 'A specialized university learning and internship linkage platform connecting higher education with the technology industry.')}
        breadcrumbs={[{ label: t('nav.home', 'Home'), href: '/' }, { label: t('nav.about', 'About') }]}
      />

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-brand-900 to-forest dark:from-neutral-900 dark:to-neutral-950 p-8 text-white border-neutral-800">
          <Badge className="bg-brand-700/60 dark:bg-emerald-900/60 text-brand-100 dark:text-emerald-300 border-brand-600 dark:border-emerald-700 mb-4">
            {t('publicPages.about.missionTitle', 'Our Mission')}
          </Badge>
          <h2 className="text-2xl font-bold mb-3">Empowering The Next Generation of Tech Leaders</h2>
          <p className="text-neutral-200 dark:text-neutral-300 text-sm leading-relaxed">
            {t('publicPages.about.missionDesc', 'AddisBuilder’s was engineered to eliminate the gap between university theoretical curricula and practical workplace requirements. By providing verified faculty-guided courses and vetted industry internships, we enable Ethiopian students to build demonstrated, project-based capability.')}
          </p>
        </Card>

        <Card className="bg-white dark:bg-neutral-900 p-8 border border-neutral-200 dark:border-neutral-800">
          <Badge variant="brand" className="mb-4">Challenge Identity</Badge>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">Brolf Tech Remote Internship Challenge 2026</h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
            AddisBuilder’s represents the official frontend engineering deliverable for Team AddisBuilder’s in the Brolf Tech Remote Internship Challenge 2026. The solution incorporates enterprise-grade architectural standards: multi-role role-based access control, TypeScript type safety, and responsive design systems.
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          {t('publicPages.about.coreValuesTitle', 'Core Pillars of AddisBuilder’s')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">
              {t('publicPages.about.pillar1Title', 'Academic Integrity')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t('publicPages.about.pillar1Desc', 'Curricula aligned with university standards and led by verified faculty mentors.')}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">
              {t('publicPages.about.pillar2Title', 'Vetted Employers')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t('publicPages.about.pillar2Desc', 'Every employer submits official business licenses and TIN verification before publishing listings.')}
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-400 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">Institutional Linkage</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              University internship coordinators validate academic compliance and track student placement.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-base">
              {t('publicPages.about.pillar3Title', 'Demonstrated Skills')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {t('publicPages.about.pillar3Desc', 'Evaluations based on real submitted code assignments, review feedback, and tangible deliverables.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

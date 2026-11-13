import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300 border-t border-neutral-800 dark:border-neutral-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 text-left rtl:text-right">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center p-2 text-white">
                <img src="/logo.svg" alt="AddisBuilder's" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">{t('brand.name', 'AddisBuilder’s')}</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t('brand.footerDescription', 'Empowering Ethiopian university talent with modern, industry-aligned learning, mentorship, and verified internship opportunities.')}
            </p>
            <div className="pt-2 text-xs text-brand-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {t('brand.challengeTag', 'Brolf Tech Remote Internship Challenge 2026')}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t('common.portal', 'Platform')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  {t('nav.courses', 'Explore Courses')}
                </Link>
              </li>
              <li>
                <Link to="/internships" className="hover:text-white transition-colors">
                  {t('nav.internships', 'Browse Internships')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about', 'About AddisBuilder’s')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact', 'Contact Support')}
                </Link>
              </li>
            </ul>
          </div>

          {/* User Roles */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              {t('common.portal', 'For Participants')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Students & Learners
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Mentors & Faculty
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Internship Coordinators
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Employers & Organizations
                </Link>
              </li>
            </ul>
          </div>

          {/* Academic Partners */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              University Linkage
            </h4>
            <p className="text-sm text-neutral-400 mb-3 leading-relaxed">
              Partnering with higher education institutions and leading tech employers across Ethiopia.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800 text-xs font-medium text-brand-300 border border-neutral-700">
              <GraduationCap className="w-4 h-4 shrink-0" />
              {t('common.accredited', 'Accredited Linkage Program')}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {CURRENT_YEAR} AddisBuilder’s. Developed for Brolf Tech Challenge 2026. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by Team AddisBuilder’s
          </p>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language, LANGUAGES } from '../../locales';
import { cn } from '../../utils';

export interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentConfig = LANGUAGES[language];

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100/80 dark:bg-neutral-800 hover:bg-neutral-200/70 dark:hover:bg-neutral-700/80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-600 border border-neutral-200/80 dark:border-neutral-700 shadow-2xs"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
        <span className="uppercase tracking-wider font-bold text-[11px]">{currentConfig.code}</span>
        <ChevronDown className={cn('w-3 h-3 text-neutral-400 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-44 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl py-1.5 z-50 focus:outline-none animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-3 py-1 border-b border-neutral-100 dark:border-neutral-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Language / ቋንቋ / اللغة
            </span>
          </div>
          {(Object.keys(LANGUAGES) as Language[]).map((code) => {
            const isSelected = language === code;
            const lang = LANGUAGES[code];
            return (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={cn(
                  'w-full text-left rtl:text-right px-3 py-2 text-xs flex items-center justify-between transition-colors',
                  isSelected
                    ? 'font-bold text-brand-800 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/50'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase w-5">
                    {lang.code}
                  </span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-700 dark:text-brand-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};


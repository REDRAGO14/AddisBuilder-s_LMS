import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, Direction, LANGUAGES, dictionaries, TranslationDictionary } from '../locales';

export interface LanguageContextType {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  t: (path: string, defaultText?: string, params?: Record<string, string | number>) => string;
  config: typeof LANGUAGES[Language];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'addis_language';

function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const keys = path.split('.');
  let current = obj;
  for (const k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) || localStorage.getItem('language');
      if (saved === 'en' || saved === 'am' || saved === 'ar') {
        return saved;
      }
    } catch {
      // Inaccessible storage fallback
    }
    return 'en';
  });

  const direction: Direction = LANGUAGES[language]?.direction || 'ltr';
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('lang', language);
      root.setAttribute('dir', direction);
    }
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage errors
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    if (lang === 'en' || lang === 'am' || lang === 'ar') {
      setLanguageState(lang);
    }
  };

  const t = (path: string, defaultText?: string, params?: Record<string, string | number>): string => {
    // 1. Try active language dictionary
    let value = getNestedValue(dictionaries[language], path);

    // 2. Fall back to English dictionary if not found in active language
    if (!value && language !== 'en') {
      value = getNestedValue(dictionaries.en, path);
    }

    // 3. Fall back to supplied defaultText or the last part of path
    if (!value) {
      value = defaultText || path.split('.').pop() || path;
    }

    // 4. Interpolate variables if provided: {key}
    if (params && value) {
      Object.entries(params).forEach(([k, v]) => {
        value = value!.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }

    return value;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        setLanguage,
        t,
        config: LANGUAGES[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


import { en, TranslationDictionary } from './en';
import { am } from './am';
import { ar } from './ar';

export type Language = 'en' | 'am' | 'ar';
export type Direction = 'ltr' | 'rtl';

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: Direction;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
  },
  am: {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    direction: 'ltr',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
  },
};

export const dictionaries: Record<Language, TranslationDictionary> = {
  en,
  am,
  ar,
};

export { en, am, ar };
export type { TranslationDictionary };


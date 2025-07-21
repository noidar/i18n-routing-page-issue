import path from 'path';
import type { UserConfig } from 'next-i18next';

const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'cs'],
    localeDetection: false, // We handle this in middleware
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  // Ensure only the current locale is loaded
  fallbackLng: false,
  load: 'currentOnly',
  // Enable type checking in development
  debug: process.env.NODE_ENV === 'development',
  // Configure interpolation for better performance
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  // Configure react options
  react: {
    useSuspense: false,
  },
};

export default nextI18NextConfig;

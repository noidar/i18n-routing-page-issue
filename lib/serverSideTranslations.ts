import { serverSideTranslations as originalSST } from 'next-i18next/serverSideTranslations';
import type { SSRConfig } from 'next-i18next';
import type { Locale } from '../i18n-config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextI18NextConfig = require('../next-i18next.config.js');

// Typed version of serverSideTranslations
export async function getServerSideTranslations(
  locale: Locale,
  namespaces: string[] = ['common']
): Promise<SSRConfig> {
  // Create a custom config that only includes the current locale
  const customConfig = {
    ...nextI18NextConfig,
    i18n: {
      ...nextI18NextConfig.i18n,
      locales: [locale], // Only include the current locale
      defaultLocale: locale,
    }
  };

  return originalSST(locale, namespaces, customConfig);
}

// Export the original for compatibility
export { serverSideTranslations } from 'next-i18next/serverSideTranslations';

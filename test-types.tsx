import React from 'react';
import { useTranslation } from 'next-i18next';

export const TestTypes: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      {/* This should work */}
      <h1>{t('pages.about.title')}</h1>
      
      {/* These would cause runtime errors but TypeScript now allows them */}
      <p>{t('pages.about.title0')}</p>
      <p>{t('nonexistent.key')}</p>
    </div>
  );
};

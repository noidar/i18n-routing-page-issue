import React from 'react';
import { useTranslation } from 'next-i18next';

export const TestTypes: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      {/* This should work */}
      <h1>{t('pages.about.title')}</h1>
      
      {/* This should cause a TypeScript error */}
      <p>{t('pages.about.title0')}</p>
      
      {/* This should also cause a TypeScript error */}
      <p>{t('nonexistent.key')}</p>
    </div>
  );
};

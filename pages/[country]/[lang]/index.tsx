import { GetServerSideProps } from "next";
import { useTranslation } from 'next-i18next';
import { getServerSideTranslations } from "../../../lib/serverSideTranslations";
import { i18n, Locale, Country } from "../../../i18n-config";
import LocaleSwitcherPages from "../../../components/locale-switcher-pages";
import { TypeScriptDemo } from "../../../components/TypeScriptDemo";
import Link from "next/link";
import { useState } from 'react';

interface HomePageProps {
  country: Country;
  lang: Locale;
}

export default function HomePage({ country, lang }: HomePageProps) {
  const { t } = useTranslation('common');
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Pages Router - Country/Language Routing</h1>
      <LocaleSwitcherPages />
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <p><strong>{t('current-country')}:</strong> {country}</p>
        <p><strong>{t('current-locale')}:</strong> {lang}</p>
        <p><strong>{t('welcome')}</strong></p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>{t('counter.title')}</h3>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ padding: '8px 16px', marginRight: '10px', cursor: 'pointer' }}
          >
            {t('counter.increment')}
          </button>
          <span style={{ margin: '0 10px', fontSize: '18px' }}>
            {t('counter.count', { count })}
          </span>
          <button 
            onClick={() => setCount(count - 1)}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            {t('counter.decrement')}
          </button>
        </div>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>{t('navigation.title')}</h3>
        <nav>
          <Link 
            href={`/${country}/${lang}/about`}
            style={{ 
              color: '#0070f3', 
              textDecoration: 'none',
              padding: '10px 20px',
              border: '1px solid #0070f3',
              borderRadius: '5px',
              display: 'inline-block'
            }}
          >
            {t('navigation.go-to-about')} →
          </Link>
        </nav>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>{t('pages-router-info')}</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const country = params?.country as Country;
  const lang = params?.lang as Locale;
  
  // Validate that the country and lang are valid
  if (!i18n.countries.includes(country) || !i18n.locales.includes(lang)) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      country,
      lang,
      // Load translations for the current locale only using typed helper
      ...(await getServerSideTranslations(lang, ['common'])),
    },
  };
};

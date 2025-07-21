import { GetServerSideProps } from "next";
import { useTranslation } from 'next-i18next';
import { getServerSideTranslations } from "../../../lib/serverSideTranslations";
import { i18n, Locale, Country } from "../../../i18n-config";
import LocaleSwitcherPages from "../../../components/locale-switcher-pages";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/router";

interface HomePageProps {
  country: Country;
  lang: Locale;
  serverTimestamp: string;
}

export default function HomePage({ country, lang, serverTimestamp }: HomePageProps) {
  const { t } = useTranslation('common');
  const [count, setCount] = useState(0);
  const [lastFetch, setLastFetch] = useState<string>(() => new Date().toISOString());
  const router = useRouter();

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Pages Router - Country/Language Routing</h1>
      <LocaleSwitcherPages />
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <p><strong>{t('current-country')}:</strong> {country}</p>
        <p><strong>{t('current-locale')}:</strong> {lang}</p>
        <p><strong>{t('welcome')}</strong></p>
        <p><strong>Server fetch time:</strong> {serverTimestamp}</p>
        <p><strong>Client load time:</strong> {lastFetch}</p>
        
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
        <h3>Refetch Options</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => {
              // Method 1: Force a hard refresh to refetch getServerSideProps
              setLastFetch(new Date().toISOString());
              router.push(router.asPath);
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Refetch Current Page
          </button>
          
          <button 
            onClick={() => {
              // Method 2: Use router.replace to force a server-side refetch
              setLastFetch(new Date().toISOString());
              router.replace(router.asPath);
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Replace & Refetch
          </button>
          
          <button 
            onClick={() => {
              // Method 3: Add a cache-busting query parameter
              setLastFetch(new Date().toISOString());
              const url = new URL(window.location.href);
              url.searchParams.set('_t', Date.now().toString());
              router.push(url.pathname + url.search);
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Cache-Bust Refetch
          </button>
          
          <button 
            onClick={() => {
              // Method 4: Hard reload (full page refresh)
              window.location.reload();
            }}
            style={{ 
              padding: '8px 16px', 
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Hard Reload
          </button>
        </div>
        
        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Each button demonstrates a different way to trigger a refetch of getServerSideProps data
        </p>
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
      serverTimestamp: new Date().toISOString(),
      ...(await getServerSideTranslations(lang, ['common'])),
    },
  };
};

import { GetServerSideProps } from "next";
import { useTranslation } from 'next-i18next';
import { getServerSideTranslations } from "../../../lib/serverSideTranslations";
import { i18n, Locale, Country } from "../../../i18n-config";
import LocaleSwitcherPages from "../../../components/locale-switcher-pages";
import Link from "next/link";

interface AboutPageProps {
  country: Country;
  lang: Locale;
}

export default function AboutPage({ country, lang }: AboutPageProps) {
  const { t } = useTranslation('common');

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link 
          href={`/${country}/${lang}`}
          style={{ color: '#0070f3', textDecoration: 'none' }}
        >
          ← {t('pages.about.go-back-home')}
        </Link>
      </nav>
      
      <h1>{t('pages.about.title')} (Pages Router)</h1>
      <LocaleSwitcherPages />
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <h2>{t('pages.about.title')}</h2>
        <p><strong>{t('current-country')}:</strong> {country}</p>
        <p><strong>{t('current-locale')}:</strong> {lang}</p>
        <p><strong>{t('welcome')}</strong></p>
        
        <div style={{ marginTop: '20px' }}>
          <h3>Company Information</h3>
          <p>{t('pages.about.description')}</p>
          <p>The content is localized based on the <code>{lang}</code> locale and <code>{country}</code> country.</p>
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>📄 This is a nested page: <code>/[country]/[lang]/about</code></p>
        <p>🔄 Rendered using <strong>Pages Router</strong> with next-i18next</p>
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
      // Load translations for the current locale using typed helper
      ...(await getServerSideTranslations(lang, ['common'])),
    },
  };
};

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Locale, Country } from '../i18n-config';
import Head from 'next/head';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextI18NextConfig = require('../next-i18next.config.js');

interface CustomPageProps {
  country?: Country;
  lang?: Locale;
}

type CustomAppProps = AppProps<CustomPageProps>;

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const { country, lang } = router.query as { country: Country; lang: Locale };

  return (
    <>
      <Head>
        <title>Pages Router - i18n Country/Language Routing</title>
        <meta name="description" content="Pages Router implementation with country/language routing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <Component {...pageProps} />
        
        {/* Footer to show which router is being used */}
        <footer style={{ 
          textAlign: 'center', 
          padding: '20px', 
          borderTop: '1px solid #eee', 
          backgroundColor: '#fff',
          marginTop: '40px'
        }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            🔄 This page is rendered using the <strong>Pages Router</strong> with next-i18next
            {country && lang && ` | Current: ${country}/${lang}`}
          </p>
        </footer>
      </div>
    </>
  );
}

// https://github.com/i18next/next-i18next#unserializable-configs
export default appWithTranslation(MyApp, nextI18NextConfig);

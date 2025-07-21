// components/locale-switcher-pages.tsx
"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { i18n, type Locale, type Country } from "../i18n-config";

export default function LocaleSwitcherPages() {
  const router = useRouter();
  const { country, lang, ...rest } = router.query;
  const currentCountry = country as Country;
  const currentLocale = lang as Locale;
  
  // Reconstruct the current path with new country/locale
  const getNewPath = (newCountry: Country, newLocale: Locale) => {    
    // Handle different page types
    if (router.pathname === '/[country]/[lang]') {
      return `/${newCountry}/${newLocale}`;
    }
    
    // For other pages like /[country]/[lang]/about
    const pathWithoutParams = router.pathname
      .replace('[country]', newCountry)
      .replace('[lang]', newLocale);
    
    return pathWithoutParams;
  };

  if (!currentCountry || !currentLocale) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p><strong>Pages Router</strong> - Country/Language switcher:</p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <h4>Countries:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {i18n.countries.map((countryCode) => {
              const isActive = countryCode === currentCountry;
              return (
                <li key={countryCode} style={{ margin: '5px 0' }}>
                  <Link 
                    href={getNewPath(countryCode, currentLocale)}
                    style={{ 
                      fontWeight: isActive ? 'bold' : 'normal',
                      textDecoration: isActive ? 'underline' : 'none',
                      color: isActive ? '#0070f3' : '#666',
                      padding: '5px 10px',
                      display: 'inline-block',
                      border: isActive ? '1px solid #0070f3' : '1px solid transparent',
                      borderRadius: '4px'
                    }}
                  >
                    {countryCode.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4>Languages:</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {i18n.locales.map((locale) => {
              const isActive = locale === currentLocale;
              return (
                <li key={locale} style={{ margin: '5px 0' }}>
                  <Link 
                    href={getNewPath(currentCountry, locale)}
                    style={{ 
                      fontWeight: isActive ? 'bold' : 'normal',
                      textDecoration: isActive ? 'underline' : 'none',
                      color: isActive ? '#0070f3' : '#666',
                      padding: '5px 10px',
                      display: 'inline-block',
                      border: isActive ? '1px solid #0070f3' : '1px solid transparent',
                      borderRadius: '4px'
                    }}
                  >
                    {locale.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

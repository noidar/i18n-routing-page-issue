export const i18n = {
  defaultLocale: "en",
  locales: ["en", "de", "cs"],
  defaultCountry: "int",
  countries: ["int", "de", "cz"],
  // Country-locale mappings
  countryLocaleMap: {
    "int": "en",
    "de": "de", 
    "cz": "cs"
  }
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type Country = (typeof i18n)["countries"][number];

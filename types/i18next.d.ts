// Import your resources to get proper typing
import type common from '../public/locales/en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    // Specify the default namespace
    defaultNS: 'common';
    // Specify the resource structure
    resources: {
      common: typeof common;
    };
    // Enable return type for keys
    returnNull: false;
  }
}

export {};

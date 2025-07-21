import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    // Disable strict typing to allow flexible key usage
    returnNull: false;
  }
}

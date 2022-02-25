// Even though test are using the theme provider in test suites, we need a static declaration of theme colors for test assertions.
// There is risk of this falling out of sync. Is there a way to generate this?
export const defaultThemePalette = {
  primary: {
    main: '#9c27b0',
  },
  success: {
    main: '#2e7d32',
  },
  warning: {
    main: '#ED6C02',
  },
};

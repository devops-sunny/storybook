const { default: reactJsx } = require('vite-react-jsx');
const { default: tsconfigPaths } = require('vite-tsconfig-paths');

const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'storybook-builder-vite',
  },
  viteFinal: async (config) => ({
    ...config,
    plugins: [
      ...config.plugins,
      tsconfigPaths({
        projects: ['../../tsconfig.json'],
      }),
      reactJsx(),
    ],
  }),
};

module.exports = { config };

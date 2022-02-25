import '@testing-library/jest-dom';

import * as globalStorybookConfig from './.storybook/preview';

import { defaultThemePalette } from './src/common/testConstants';
import { setGlobalConfig } from '@storybook/testing-react';

jest.mock('@material-ui/core', () => {
  const lib = jest.requireActual('@material-ui/core');

  return {
    ...lib,
    useTheme: jest.fn().mockImplementation(() => ({
      ...lib.useTheme(),
      ...defaultThemePalette,
    })),
  };
});

setGlobalConfig(globalStorybookConfig);

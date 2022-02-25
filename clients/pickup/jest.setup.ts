import '@testing-library/jest-dom';

import * as globalStorybookConfig from './.storybook/preview';

import { setGlobalConfig } from '@storybook/testing-react';

setGlobalConfig(globalStorybookConfig);

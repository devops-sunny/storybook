import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';
import {
  storybookFeatureFlagArgType,
  storybookFeatureFlagDefaultArg,
} from '@bb/common/providers/appFeaturesProvider/features.mocks';

import { AppFeaturesProvider } from '@bb/common/providers/appFeaturesProvider/AppFeaturesProvider';
import { Attract } from './Attract';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '../nineSixteen/NineSixteen';

const meta = {
  title: '1-Attract/1-Attract',
  argTypes: {
    ...storybookFeatureFlagArgType,
  },
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <MockedAppDataProvider order={undefined} debug>
      <NineSixteen>
        <AppFeaturesProvider
          features={args.features}
          key={JSON.stringify({
            features: args.features,
          })}>
          <MemoryRouter initialEntries={['/attract']}>
            <Routes>
              <Route path="/attract">
                <Attract />
              </Route>
              <Route path="/approach">
                <div>
                  <p>
                    <strong>Attract</strong> navigates to{' '}
                    <strong>Approach</strong> when user is sensed nearby
                  </p>
                  <Link to="/attract">back</Link>
                </div>
              </Route>
              <Route path="/greet">
                <div>
                  <p>
                    <strong>Attract</strong> navigates to <strong>Greet</strong>{' '}
                    when user touches the screen
                  </p>
                  <Link to="/attract">back</Link>
                </div>
              </Route>
            </Routes>
          </MemoryRouter>
        </AppFeaturesProvider>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.storyName = meta.title.split('/')[1];
Default.args = {
  ...storybookFeatureFlagDefaultArg,
};

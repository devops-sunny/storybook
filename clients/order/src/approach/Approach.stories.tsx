import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, Story } from '@storybook/react';

import { Approach } from './Approach';
import { MockedAppDataProvider } from '../providers/AppDataProvider/AppDataProvider';
import { NineSixteen } from '../nineSixteen/NineSixteen';
import { timeouts } from '../common/constants';

const meta = {
  title: '2-Approach/1-Approach',
} as Meta;

export default meta;

export const Default: Story = (args) => {
  return (
    <MockedAppDataProvider order={undefined} debug>
      <NineSixteen>
        <MemoryRouter initialEntries={['/approach']}>
          <Routes>
            <Route path="/approach">
              <Approach timeoutMs={args.timeoutMs} />
            </Route>
            <Route path="/attract">
              <div>
                <p>
                  <strong>Approach</strong> navigates to{' '}
                  <strong>Attract</strong> after timeout
                </p>
                <Link to="/approach">back</Link>
              </div>
            </Route>
            <Route path="/greet">
              <div>
                <p>
                  <strong>Approach</strong> navigates to <strong>Greet</strong>{' '}
                  when user touches screen
                </p>
                <Link to="/approach">back</Link>
              </div>
            </Route>
          </Routes>
        </MemoryRouter>
      </NineSixteen>
    </MockedAppDataProvider>
  );
};

Default.args = {
  timeoutMs: timeouts.STORYBOOK_NAVIGATE_DEFAULT,
};
Default.storyName = meta.title.split('/')[1];

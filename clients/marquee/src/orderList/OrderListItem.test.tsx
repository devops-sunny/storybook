import * as stories from './OrderListItem.stories';

import { render, screen, waitFor } from '@testing-library/react';

import { composeStories } from '@storybook/testing-react';

const { Default } = composeStories(stories);

// We will skip these tests that rely on `composeStories` because when we added the feature flag implementation to the storybook root preview, the async load of `features.json` blocks unit testing.
// All newer tests render test-specific component trees and are therefore not brittle to changes in the storybook root preview.
test.skip('displays deliver order button when status is ProductionCompleted', async () => {
  render(<Default />);

  await waitFor(() => {
    expect(screen.queryByText('Deliver Order')).toBeInTheDocument();
  });
});

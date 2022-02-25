import { AppFeaturesJson } from './types';

export const defaultFeatures: AppFeaturesJson = {
  features: {},
};

export const mockExperimentalFeatures: AppFeaturesJson = {
  features: {
    CONSUMER_WORKFLOW_MODE: {
      identifier: 'CONSUMER_WORKFLOW_MODE',
      name: 'Consumer Workflow Mode',
      description:
        'Consumer Workflow Mode sets how and when different kiosk screens will interact with a consumer user, with different workflow content on the order and pickup screens at different times, depending on the variant.',
      variant: {
        identifier: 'B__VENDING_APPROACH',
        name: 'B - Vending Approach',
        description:
          'Engages walk-up users to the Order screen during Ordering only, then engages walk-up users to the Pickup screen during the entirety of Production and Delivery (skipping Storage). Marquee screen suppresses the display of Pickup Availability and Order Callout.',
      },
    },
  },
};

enum storybookFeatureFlagOptions {
  DEFAULT = 'default features',
  EXPERIMENTAL = 'experimental features',
}

export const storybookFeatureFlagArgType = {
  features: {
    options: [
      storybookFeatureFlagOptions.DEFAULT,
      storybookFeatureFlagOptions.EXPERIMENTAL,
    ],
    mapping: {
      [storybookFeatureFlagOptions.DEFAULT]: defaultFeatures.features,
      [storybookFeatureFlagOptions.EXPERIMENTAL]:
        mockExperimentalFeatures.features,
    },
    control: {
      type: 'select',
    },
  },
};

export const storybookFeatureFlagDefaultArg = {
  features: storybookFeatureFlagOptions.DEFAULT,
};

export const storybookFeatureFlagExperimentalArg = {
  features: storybookFeatureFlagOptions.EXPERIMENTAL,
};

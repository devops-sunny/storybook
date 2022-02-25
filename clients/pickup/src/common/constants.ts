export const timeouts = {
  NAVIGATE_AFTER_IDLE: 30 * 1000,
  NAVIGATE_AFTER_ACTION: 5 * 1000,

  STORYBOOK_NAVIGATE_AFTER_IDLE: 6 * 1000,
  STORYBOOK_NAVIGATE_AFTER_ACTION: 1.5 * 1000,

  UNIT_TEST_DEFAULT: 0,
  UNIT_TEST_TICK: 1,
};

export const sizes = {
  PICKUP_DISPLAY_SMALLER_RESOLUTION: 480,
};

export const bgImages = {
  IDLE: 'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--idle.png',
  ATTRACT:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--attract.png',
  GREET:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--greet.png',
  GREET_IDENTIFIED:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--greet-identified.png',
  DELIVERY:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--delivery-start.png',
  DELIVERY_RETRIEVING:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--delivery-retrieving.png',
  DELIVERY_COLLECT:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--delivery.png',
  DELIVERY_INTERSTITIAL:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--delivery-interstitial.png',
  DELIVERY_DONE:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--delivery-done.png',
  INTERSTITIAL_PREPARING:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--interstitial-preparing.png',
  INTERSTITIAL_SIGNUP:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--interstitial-signup.png',
  INTERSTITIAL_THANKS:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--interstitial-thanks.png',
  PRODUCTION_PREPARING:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--interstitial-preparing.png',
  PRODUCTION_READY:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--production-ready-1.png',
  PRODUCTION_INTERSTITIAL:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--interstitial.png',
  PRODUCTION_DELIVERY_1:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--production-delivery-1.png',
  PRODUCTION_DELIVERY_2:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--production-delivery-1.png',
  PRODUCTION_PREPARING_1:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--production-preparing-1.png',
  PRODUCTION_PREPARING_2:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/pickup--production-preparing-1.png',
};

// styles ViewSkeleton to render background full-bleed while allowing for scrolling of vertical overflow
export const viewSkeletonStyles = {
  height: 480,
  maxWidth: 480,
  width: '100vmin',
  backgroundSize: 'cover',
  padding: 3,
};

export const timeouts = {
  // Order application timeouts
  APPROACH_NAVIGATE_TO_ATTRACT: 30 * 1000, // go back to normal if no user present
  GREET_NAVIGATE_TO_ORDER_SUGGEST: 2 * 1000, // give time to read the greeting, then move on
  NAVIGATE_AFTER_ACTION: 5 * 1000,
  INTERSTITIAL: 2 * 1000,
  WAIT_LOOP_NAVIGATE: 10 * 1000,
  DELIVERY_NAVIGATE_TO_APPROACH: 15 * 1000, // cooling time before engaging with next user

  // storybook timeouts
  STORYBOOK_NAVIGATE_DEFAULT: 30 * 1000, // for all time-based navigation

  // unit test timeouts
  UNIT_TEST_DEFAULT: 0, // for almost all test cases
  UNIT_TEST_TICK: 1,
};

export const bgImages = {
  ATTRACT:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--attract.png',
  APPROACH:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--approach.png',
  GREET:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--greet.png',
  MENU_SUGGEST:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--menu-suggest.png',
  MENU_SUGGEST_SIZES:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--menu-suggest-sizes.png',
  FULL_MENU:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--full-menu.png',
  SUB_MENU:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--sub-menu.png',
  SUB_MENU_SIZES:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--sub-menu-sizes.png',
  ITEM_MODIFICATION:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification.png',
  ITEM_MODIFICATION_MILK:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification-milk.png',
  ITEM_MODIFICATION_MILK_SELECTED:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification-milk-selected.png',
  ITEM_MODIFICATION_SYRUP:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification-syrup.png',
  ITEM_MODIFICATION_SHOTS:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification-shots.png',
  ITEM_MODIFICATION_ADDED_TO_ORDER:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--item-modification-add-to-order.png',
  CONFIRM_INTERSTITIAL:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--confirm-interstital.png',
  CONFIRM_ORDER_SUMMARY:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--confirm-order-summary.png',
  CONFIRM_PAYMENT:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--confirm-payment.png',
  CONFIRM_PAYMENT_PROCESSING:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--confirm-payment-processing.png',
  CONFIRM_SUCCESS:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--confirm-success.png',
  WAIT_STAND_HERE:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-here.png',
  WAIT_PROGRESS:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress.png',
  WAIT_PROGRESS_ITEMS:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress-items.png',
  WAIT_PROGRESS_QUEUE:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress-queue.png',
  WAIT_PROGRESS_PRODUCTION:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress-production.png',
  WAIT_PROGRESS_STAGING:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress-storage.png',
  WAIT_PROGRESS_READY:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-progress-ready.png',
  WAIT_SIGNUP:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--wait-signup.png',
  DELIVERY:
    'https://sfc-dev-us-media-assets-site-origin.s3.amazonaws.com/order--delivery.png',
};

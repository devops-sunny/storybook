import { AppConfig } from '.';
import { mockAppStaticConfig } from './mockAppStaticConfig';

export const mockAppDynamicConfig: AppConfig = {
  ...mockAppStaticConfig,
  storefrontId: 'mock-storefront-id',
  storefrontName: 'mock-storefront-name',
  producerId: 'mock-producer-id',
  producerSerial: 'mock-producer-serial',
};

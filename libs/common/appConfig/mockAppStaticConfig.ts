import { AppStaticConfig } from './AppStaticConfigProvider';

export const mockAppStaticConfig: AppStaticConfig = {
  services: {
    gateway: {
      gql: {
        endpoint: 'http://localhost:3100/graphql',
        subscriptionEndpoint: '',
      },
    },
  },
  clientName: 'mockClient',
};

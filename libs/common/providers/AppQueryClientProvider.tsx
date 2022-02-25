import { QueryClient, QueryClientProvider } from 'react-query';

import React from 'react';

const client = new QueryClient();

export function AppQueryClientProvider(props: React.PropsWithChildren<{}>) {
  const { children } = props;

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

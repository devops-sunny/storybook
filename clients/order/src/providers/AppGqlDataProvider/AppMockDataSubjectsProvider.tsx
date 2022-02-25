import { Source, makeSubject } from 'wonka';
import { createContext, useContext } from 'react';

import { OrderQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';

const AppMockDataSubjectsContext = createContext<{
  getOrderStream: Source<OrderQueryResponse>;
  pushGetOrderResponse: (_1: any) => void;
}>({
  getOrderStream: () => {},
  pushGetOrderResponse: () => {},
});

export const AppMockDataSubjectsProvider: React.FunctionComponent<{}> = (
  props,
) => {
  const { source: getOrdersStream, next: pushGetOrdersResponse } =
    makeSubject<OrderQueryResponse>();

  return (
    <AppMockDataSubjectsContext.Provider
      value={{
        getOrderStream: getOrdersStream,
        pushGetOrderResponse: pushGetOrdersResponse,
      }}>
      {props.children}
    </AppMockDataSubjectsContext.Provider>
  );
};

export function useAppMockDataSubjects() {
  const context = useContext(AppMockDataSubjectsContext);

  if (!context) {
    throw new Error(
      'useAppMockDataSubjects must be used in a descendent of AppMockDataSubjectsProvider',
    );
  }

  return context;
}

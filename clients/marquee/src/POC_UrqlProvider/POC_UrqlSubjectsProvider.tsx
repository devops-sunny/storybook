import { createContext, useContext } from 'react';

import { makeSubject } from 'wonka';

const POC_UrqlSubjectsContext = createContext<{
  getOrdersStream: any;
  pushGetOrdersResponse: any;
}>({
  getOrdersStream: {},
  pushGetOrdersResponse: {},
});

export const POC_UrqlSubjectsProvider: React.FunctionComponent<{}> = (
  props,
) => {
  const { source: getOrdersStream, next: pushGetOrdersResponse } =
    makeSubject();
  return (
    <POC_UrqlSubjectsContext.Provider
      value={{
        getOrdersStream,
        pushGetOrdersResponse,
      }}>
      {props.children}
    </POC_UrqlSubjectsContext.Provider>
  );
};

export function usePocUrqlSubjectsProvider() {
  const context = useContext(POC_UrqlSubjectsContext);

  if (!context) {
    throw new Error(
      'usePocUrqlSubjectsProvider must be used in a descendent of PocUrqlSubjectsProvider',
    );
  }

  return context;
}

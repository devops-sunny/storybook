import {
  OrdersQueryResponse,
  UserQueryResponse,
} from '@bb/common/types/tmpTypes/responseTypes';
import { Source, makeSubject } from 'wonka';
import { createContext, useContext } from 'react';

const AppMockDataSubjectsContext = createContext<{
  getOrdersStream: Source<OrdersQueryResponse>;
  pushGetOrdersResponse: (_1: OrdersQueryResponse) => void;
  getUserStream: Source<UserQueryResponse>;
  pushGetUserResponse: (_1: UserQueryResponse) => void;
}>({
  getOrdersStream: () => {},
  pushGetOrdersResponse: () => {},
  getUserStream: () => {},
  pushGetUserResponse: () => {},
});

export const AppMockDataSubjectsProvider: React.FunctionComponent<{}> = (
  props,
) => {
  const { source: getOrdersStream, next: pushGetOrdersResponse } =
    makeSubject<OrdersQueryResponse>();
  const { source: getUserStream, next: pushGetUserResponse } =
    makeSubject<UserQueryResponse>();

  return (
    <AppMockDataSubjectsContext.Provider
      value={{
        getOrdersStream,
        pushGetOrdersResponse,
        getUserStream,
        pushGetUserResponse,
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

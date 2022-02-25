import {
  OrdersQueryResponse,
  UsersQueryResponse,
} from '@bb/common/types/tmpTypes/responseTypes';
import { Source, makeSubject } from 'wonka';
import { createContext, useContext } from 'react';

const AppMockDataSubjectsContext = createContext<{
  getOrdersStream: Source<OrdersQueryResponse>;
  pushGetOrdersResponse: (_1: OrdersQueryResponse) => void;
  getUsersStream: Source<UsersQueryResponse>;
  pushGetUsersResponse: (_1: UsersQueryResponse) => void;
}>({
  getOrdersStream: () => {},
  pushGetOrdersResponse: () => {},
  getUsersStream: () => {},
  pushGetUsersResponse: () => {},
});

export const AppMockDataSubjectsProvider: React.FunctionComponent<{}> = (
  props,
) => {
  const { source: getOrdersStream, next: pushGetOrdersResponse } =
    makeSubject<OrdersQueryResponse>();
  const { source: getUsersStream, next: pushGetUsersResponse } =
    makeSubject<UsersQueryResponse>();

  return (
    <AppMockDataSubjectsContext.Provider
      value={{
        getOrdersStream,
        pushGetOrdersResponse,
        getUsersStream,
        pushGetUsersResponse,
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

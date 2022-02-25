import { Client, GraphQLRequest, Provider, createClient } from 'urql';
import {
  MUTATION_ADD_ITEM_TO_ORDER,
  MUTATION_CREATE_MODIFIED_PRODUCT_VARIATION,
  MUTATION_CREATE_ORDER,
  MUTATION_PRODUCE_ORDER,
  MUTATION_REMOVE_ITEM_FROM_ORDER,
  MUTATION_SET_ORDER_ITEM_MODIFIED_PRODUCT_VARIATION,
} from '@bb/order/gql/mutations';
import {
  QUERY_KIOSK_MENUS,
  QUERY_MAIN_MENU,
  QUERY_ORDER,
  QUERY_PRODUCT_VARIATION_CONTENT,
  QUERY_SUB_MENU,
  QUERY_SUB_MENUS,
} from '@bb/order/gql/queries';
import { fromValue, never } from 'wonka';

import { ServiceConfig } from '@bb/common/appConfig/AppStaticConfigProvider';
import { mockAppStaticConfig } from '@bb/common/appConfig/mockAppStaticConfig';
import { mockKiosk } from '@bb/order/fixtures/menu/kiosk';
import { mockMainMenu } from '@bb/order/fixtures/menu/mainMenu';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { mockSubMenu } from '@bb/order/fixtures/menu/subMenu';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';
import { useAppMockDataSubjects } from './AppMockDataSubjectsProvider';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

type AppGqlDataProviderProps = {
  gqlEndpoint: string;
  mock?: boolean;
  // optional mock functions allow for white-box-testing assertions of queries or mutations
  mockQueryFn?: (req: GraphQLRequest) => any;
  mockMutationFn?: (req: GraphQLRequest) => any;
};

/*
 * This component handles real AND mock GQL requests/responses
 * In `mock` mode, it uses mock GQL responses ONLY.
 * Otherwise, it blends together 1) mocked responses (for welcome-listed queries/mutations) and 2) real requests (for unmatched queries/mutations).
 */
export const AppGqlDataProvider: React.FunctionComponent<AppGqlDataProviderProps> =
  (props) => {
    const { gqlEndpoint, children, mock, mockQueryFn, mockMutationFn } = props;
    const { getOrderStream, pushGetOrderResponse } = useAppMockDataSubjects();

    const client = useMemo(() => {
      const realClient: Client = !mock
        ? createClient({
            // use the gateway GQL endpoint from props (which comes from config.json in the app)
            url: gqlEndpoint,
          })
        : ({
            // an empty mock client for tests
            executeQuery: (req: any) => {
              if (mockQueryFn) return mockQueryFn(req);
              return never;
            },
            executeMutation: (req: any) => {
              if (mockMutationFn) return mockMutationFn(req);
              return never;
            },
          } as any);
      const mockClient: any = {
        ...realClient,
        executeQuery: (req: any) => {
          const { query, variables } = req;
          switch (query) {
            // explicitly mock queries "by name"
            case QUERY_ORDER:
              if (mock) {
                // set default value
                pushGetOrderResponse({
                  data: {
                    order: undefined,
                  },
                });
                // return a stream to which we can push more responses later
                return getOrderStream;
              } else {
                return realClient.executeQuery(req);
              }

            case QUERY_KIOSK_MENUS:
              return fromValue({
                data: {
                  kiosk: {
                    ...mockKiosk,
                    id: variables.storefrontId,
                  },
                },
              });

            case QUERY_MAIN_MENU:
              if (variables && variables.menuId === mockMainMenu.alpha3.id) {
                return fromValue({
                  data: {
                    mainMenu: mockMainMenu.alpha3,
                  },
                });
              } else
                return fromValue({
                  data: `ERROR: no menu matches menuID ${variables.menuId}`,
                });

            case QUERY_SUB_MENU:
              if (variables && variables.menuId) {
                switch (variables.menuId) {
                  case mockSubMenu.groupOne.id:
                    return fromValue({
                      data: {
                        subMenu: mockSubMenu.groupOne,
                      },
                    });
                  case mockSubMenu.groupTwo.id:
                    return fromValue({
                      data: {
                        subMenu: mockSubMenu.groupTwo,
                      },
                    });
                  case mockSubMenu.groupThree.id:
                    return fromValue({
                      data: {
                        subMenu: mockSubMenu.groupThree,
                      },
                    });
                  case mockSubMenu.groupFour.id:
                    return fromValue({
                      data: {
                        subMenu: mockSubMenu.groupFour,
                      },
                    });
                  default:
                    return fromValue({
                      data: `ERROR: no menu matches menuID ${variables.menuId}`,
                    });
                }
              } else
                return fromValue({
                  data: `ERROR: no menu matches menuID ${variables.menuId}`,
                });
            case QUERY_SUB_MENUS:
              if (variables?.menuIds?.length) {
                return fromValue({
                  data: {
                    subMenus: [
                      mockSubMenu.groupOne,
                      mockSubMenu.groupTwo,
                      mockSubMenu.groupThree,
                      mockSubMenu.groupFour,
                    ],
                  },
                });
              } else
                return fromValue({
                  data: `ERROR: no menus match the provided menuIDs`,
                });

            case QUERY_PRODUCT_VARIATION_CONTENT:
              if (variables.productVariationId) {
                return fromValue({
                  data: {
                    productVariationContent: productVariationViews.find(
                      (view) => view.id === variables.productVariationId,
                    ),
                  },
                });
              } else if (variables.productVariationName) {
                return fromValue({
                  data: {
                    productVariationContent: productVariationViews.find(
                      (view) => view.name === variables.productVariationName,
                    ),
                  },
                });
              } else
                return fromValue({
                  data: `ERROR: no product variations match the provided productVariation ID`,
                });

            // otherwise, use the real client!
            default:
              return realClient.executeQuery(req);
          }
        },
        executeMutation: (req: any) => {
          const { query, variables } = req;
          switch (query) {
            case MUTATION_CREATE_ORDER:
              if (mock) {
                return fromValue({
                  data: {
                    createOrder: {
                      order: mockOrder().value(),
                    },
                  },
                });
              } else {
                return realClient.executeMutation(req);
              }
            case MUTATION_CREATE_MODIFIED_PRODUCT_VARIATION:
              if (mock) {
                return fromValue({
                  data: {
                    createModifiedProductVariation: {
                      modifiedProductVariation: {
                        id: uuidv4(),
                      },
                    },
                  },
                });
              } else {
                return realClient.executeMutation(req);
              }
            case MUTATION_ADD_ITEM_TO_ORDER:
              if (mock) {
                // this mock mutation can only add a single item to an order.
                return fromValue({
                  data: {
                    addItemToOrder: {
                      order: {
                        ...mockOrder()
                          .addItem({
                            modifiedProductVariation: {
                              id: variables.modifiedProductVariationId,
                              productVariation: {
                                id: uuidv4(),
                                name: `product-variation-1`,
                              },
                            },
                          })
                          .validateAllItems({ validations: validValidations })
                          .value(),
                        id: variables.orderId,
                      },
                    },
                  },
                });
              } else {
                return realClient.executeMutation(req);
              }
            case MUTATION_SET_ORDER_ITEM_MODIFIED_PRODUCT_VARIATION:
              // this mock mutation only works on a single order item.
              const order = mockOrder()
                .addItem({
                  modifiedProductVariation: {
                    id: variables.modifiedProductVariationId,
                    productVariation: {
                      id: uuidv4(),
                      name: `product-variation-1`,
                    },
                  },
                })
                .validateAllItems({ validations: validValidations })
                .value();
              return fromValue({
                data: {
                  order: {
                    ...order,
                    id: variables.orderId,
                    items: [
                      {
                        ...order.items[0],
                        id: variables.orderItemId,
                      },
                    ],
                  },
                },
              });
            case MUTATION_REMOVE_ITEM_FROM_ORDER:
              // this mock mutation only works on a single order item
              return fromValue({
                data: {
                  order: {
                    ...mockOrder().value(),
                    id: variables.orderId,
                  },
                },
              });
            case MUTATION_PRODUCE_ORDER:
              if (mock) {
                // this mock mutation must create a new order item
                return fromValue({
                  data: {
                    produceOrder: {
                      order: {
                        ...mockOrder()
                          .addItem({
                            modifiedProductVariation: {
                              id: uuidv4(),
                              productVariation: {
                                id: uuidv4(),
                                name: `product-variation-1`,
                              },
                            },
                          })
                          .validateAllItems({ validations: validValidations })
                          .updateAllItemsStatus({ status: 'ProductionReady' })
                          .value(),
                        id: variables.orderId,
                      },
                    },
                  },
                });
              } else {
                return realClient.executeMutation(req);
              }
            default:
              return realClient.executeMutation(req);
          }
        },
      };
      return mockClient;
    }, [
      getOrderStream,
      pushGetOrderResponse,
      gqlEndpoint,
      mock,
      mockQueryFn,
      mockMutationFn,
    ]);

    return <Provider value={client}>{children}</Provider>;
  };

export const mockGqlConfig: ServiceConfig =
  mockAppStaticConfig.services.gateway;

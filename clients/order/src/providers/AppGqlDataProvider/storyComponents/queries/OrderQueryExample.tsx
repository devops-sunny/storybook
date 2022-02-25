import { Box, Button } from '@material-ui/core';

import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { QUERY_ORDER } from '@bb/order/gql/queries';
import { mockOrder } from '@bb/common/fixtures/orders/mockOrder/mockOrder';
import { useAppMockDataSubjects } from '../../AppMockDataSubjectsProvider';
import { useMount } from 'react-use';
import { useQuery } from 'urql';
import { v4 as uuidv4 } from 'uuid';
import { validValidations } from '@bb/common/fixtures/orders/staticMocks';

export const OrderQueryExample: React.FunctionComponent<{}> = (props) => {
  const { pushGetOrderResponse: pushGetOrdersResponse } =
    useAppMockDataSubjects();
  const [orderResult, reexecuteOrderQuery] = useQuery<{
    order: Order | undefined;
  }>({
    query: QUERY_ORDER,
  });
  const {
    data: orderData,
    fetching: ordersFetching,
    error: ordersError,
  } = orderResult;

  // re-execute query on mount to get initial value from stream
  useMount(() => {
    reexecuteOrderQuery();
  });

  const setWalkupOrderBeginsProduction = () => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder()
          .addItem({
            modifiedProductVariation: {
              id: uuidv4(),
              productVariation: {
                id: uuidv4(),
                name: `product-variation-1`,
              },
            },
          })
          .addItem({
            modifiedProductVariation: {
              id: uuidv4(),
              productVariation: {
                id: uuidv4(),
                name: `product-variation-2`,
              },
            },
          })
          .validateAllItems({ validations: [...validValidations] })
          .updateAllItemsStatus({ status: 'ProductionReady' })
          .value(),
      },
    });
  };

  const setItemProductionInProgress = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder({ order })
          .updateIndexItemStatus({ index, status: 'ProductionInProgress' })
          .value(),
      },
    });
  };

  const setItemProductionCompleted = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder({ order })
          .updateIndexItemStatus({ index, status: 'ProductionSucceeded' })
          .value(),
      },
    });
  };

  const setItemDeliveryInProgress = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder({ order })
          .updateIndexItemStatus({ index, status: 'DeliveryInProgress' })
          .value(),
      },
    });
  };

  const setItemDeliveryCompleted = (order: Order, index: number) => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder({ order })
          .updateIndexItemStatus({ index, status: 'DeliverySucceeded' })
          .value(),
      },
    });
  };

  const setAppOrderCompletesProduction = () => {
    pushGetOrdersResponse({
      data: {
        order: mockOrder()
          .addItem({
            modifiedProductVariation: {
              id: uuidv4(),
              productVariation: {
                id: uuidv4(),
                name: `product-variation-1`,
              },
            },
          })
          .addItem({
            modifiedProductVariation: {
              id: uuidv4(),
              productVariation: {
                id: uuidv4(),
                name: `product-variation-2`,
              },
            },
          })
          .validateAllItems({ validations: [...validValidations] })
          .updateAllItemsStatus({ status: 'DeliveryReady' })
          .value(),
      },
    });
  };

  const clearOrders = () => {
    pushGetOrdersResponse({
      data: {
        order: undefined,
      },
    });
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>{JSON.stringify(orderData, null, 2)}</pre>
      </Box>
      <pre>Walk-up Order</pre>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setWalkupOrderBeginsProduction}>
          Walk-up Order Begins Production
        </Button>
        <Button onClick={clearOrders}>Clear Orders</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (orderData?.order)
              setItemProductionInProgress(orderData.order, 0);
          }}>
          First Item to Production In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order)
              setItemProductionCompleted(orderData.order, 0);
          }}>
          First Item to Production Completed
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryInProgress(orderData.order, 0);
          }}>
          First Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryCompleted(orderData.order, 0);
          }}>
          First Item to Delivery Completed
        </Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (orderData?.order)
              setItemProductionInProgress(orderData.order, 1);
          }}>
          Last Item to Production In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order)
              setItemProductionCompleted(orderData.order, 1);
          }}>
          Last Item to Production Completed
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryInProgress(orderData.order, 1);
          }}>
          Last Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryCompleted(orderData.order, 1);
          }}>
          Last Item to Delivery Completed
        </Button>
      </Box>
      <pre>App Order</pre>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={setAppOrderCompletesProduction}>
          App Order Completes Production
        </Button>
        <Button onClick={clearOrders}>Clear Orders</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryInProgress(orderData.order, 0);
          }}>
          First Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryCompleted(orderData.order, 0);
          }}>
          First Item to Delivery Completed
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryInProgress(orderData.order, 1);
          }}>
          Last Item to Delivery In Progress
        </Button>
        <Button
          onClick={() => {
            if (orderData?.order) setItemDeliveryCompleted(orderData.order, 1);
          }}>
          Last Item to Delivery Completed
        </Button>
      </Box>
    </Box>
  );
};

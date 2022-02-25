import { Box, Button } from '@material-ui/core';
import {
  MUTATION_ADD_ITEM_TO_ORDER,
  MUTATION_CREATE_ORDER,
  MUTATION_PRODUCE_ORDER,
  MUTATION_REMOVE_ITEM_FROM_ORDER,
  MUTATION_SET_ORDER_ITEM_MODIFIED_PRODUCT_VARIATION,
} from '@bb/order/gql/mutations';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'urql';

import { Order } from '@bb/common/types/tmpTypes/entityTypes';
import { OrderQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';
import { QUERY_ORDER } from '@bb/order/gql/queries';
import { useAppMockDataSubjects } from '../../AppMockDataSubjectsProvider';
import { useMount } from 'react-use';
import { v4 as uuidv4 } from 'uuid';

export const MutationsExample: React.FunctionComponent<{}> = (props) => {
  const [createOrderResult, createOrder] = useMutation(MUTATION_CREATE_ORDER);
  const [addItemToOrderResult, addItemToOrder] = useMutation(
    MUTATION_ADD_ITEM_TO_ORDER,
  );
  const [setOrderItemMPVResult, setOrderItemMPV] = useMutation(
    MUTATION_SET_ORDER_ITEM_MODIFIED_PRODUCT_VARIATION,
  );
  const [removeItemFromOrderResult, removeItemFromOrder] = useMutation(
    MUTATION_REMOVE_ITEM_FROM_ORDER,
  );
  const [produceOrderResult, produceOrder] = useMutation(
    MUTATION_PRODUCE_ORDER,
  );

  const { pushGetOrderResponse } = useAppMockDataSubjects();
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

  enum MutationResult {
    none = 'none',
    createOrderResult = 'createOrderResult',
    addItemToOrderResult = 'addItemToOrderResult',
    setOrderItemMPVResult = 'setOrderItemMPVResult',
    removeItemFromOrderResult = 'removeItemFromOrderResult',
    produceOrderResult = 'produceOrderResult',
  }
  const [activeResult, setActiveResult] = useState<MutationResult>(
    MutationResult.none,
  );
  const mutationResults: Record<MutationResult, any> = useMemo(() => {
    return {
      none: 'n/a',
      createOrderResult,
      addItemToOrderResult,
      setOrderItemMPVResult,
      removeItemFromOrderResult,
      produceOrderResult,
    };
  }, [
    createOrderResult,
    addItemToOrderResult,
    setOrderItemMPVResult,
    removeItemFromOrderResult,
    produceOrderResult,
  ]);

  // re-execute query on mount to get initial value from order query stream
  useMount(() => {
    reexecuteOrderQuery();
  });

  const handleCreateOrder = () => {
    setActiveResult(MutationResult.createOrderResult);
    createOrder({ storefrontId: 'storefront1' }).then((result) => {
      pushGetOrderResponse(result as OrderQueryResponse);
    });
  };

  const handleCloseCurrentOrder = () => {
    setActiveResult(MutationResult.none);
    pushGetOrderResponse({ data: { order: undefined } });
  };

  const handleAddItem = () => {
    if (orderData?.order) {
      setActiveResult(MutationResult.addItemToOrderResult);
      addItemToOrder({
        orderId: orderData?.order.id,
        modifiedProductVariationId: uuidv4(),
      }).then((result) => {
        pushGetOrderResponse(result as OrderQueryResponse);
      });
    }
  };

  const handleSetOrderItemModifiedProductVariation = () => {
    if (orderData?.order && orderData?.order.items.length) {
      setActiveResult(MutationResult.setOrderItemMPVResult);
      setOrderItemMPV({
        orderId: orderData?.order.id,
        orderItemId: orderData?.order.items[0]?.id,
        modifiedProductVariationId: uuidv4(),
      }).then((result) => {
        pushGetOrderResponse(result as OrderQueryResponse);
      });
    }
  };

  const handleRemoveItemFromOrder = () => {
    if (orderData?.order && orderData?.order.items.length) {
      setActiveResult(MutationResult.removeItemFromOrderResult);
      removeItemFromOrder({
        orderId: orderData?.order.id,
        orderItemId: orderData?.order.items[0]?.id,
      }).then((result) => {
        pushGetOrderResponse({
          data: {
            order: result.data?.order,
          },
        });
      });
    }
  };

  const handleProduceOrder = () => {
    if (orderData?.order && orderData?.order.items.length) {
      setActiveResult(MutationResult.produceOrderResult);
      produceOrder({
        orderId: orderData?.order.id,
      }).then((result) => {
        pushGetOrderResponse({
          data: {
            order: result.data?.order,
          },
        });
      });
    }
  };

  return (
    <Box
      display="flex"
      flex="1 1 auto"
      flexDirection="column"
      overflow="hidden">
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>
          ORDER QUERY SUBSCRIPTION:
          <br />
          {JSON.stringify(orderData, null, 2)}
        </pre>
      </Box>
      <Box display="flex" flex="1 1 auto" overflow="auto">
        <pre>
          MUTATION RESPONSE:
          <br />
          {JSON.stringify(mutationResults[activeResult], null, 2)}
        </pre>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={handleCreateOrder}>Create Current Order</Button>
        <Button onClick={handleCloseCurrentOrder}>Close Current Order</Button>
      </Box>
      <Box display="flex" flex="0 0 auto">
        <Button onClick={handleAddItem}>Add Item to Order</Button>
        <Button onClick={handleSetOrderItemModifiedProductVariation}>
          Set Order Item MPV
        </Button>
        <Button onClick={handleRemoveItemFromOrder}>
          Remove Item from Order
        </Button>
        <Button onClick={handleProduceOrder}>Produce Order</Button>
      </Box>
    </Box>
  );
};

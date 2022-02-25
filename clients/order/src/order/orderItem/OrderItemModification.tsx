import { Box, Button, useTheme } from '@material-ui/core';
import {
  MUTATION_ADD_ITEM_TO_ORDER,
  MUTATION_CREATE_MODIFIED_PRODUCT_VARIATION,
} from '@bb/order/gql/mutations';
import { useNavigate, useParams } from 'react-router-dom';

import { ActionBar } from '@bb/common/actionBar/ActionBar';
import { AddToOrderDrawer } from './AddToOrderDrawer';
import { LogoBar } from '@bb/common/appHeader/LogoBar';
import { ProductVariationHero } from './ProductVariationHero';
import { productVariationViews } from '@bb/order/fixtures/menu/productVariationViews';
import { useAppDataContext } from '@bb/order/providers/AppDataProvider/AppDataProvider';
import { useAppMockDataSubjects } from '@bb/order/providers/AppGqlDataProvider/AppMockDataSubjectsProvider';
import { useMutation } from 'urql';
import { useState } from 'react';

export type OrderItemModificationProps = {};

enum ItemModificationSections {
  NONE,
  SIZE,
  REFRIGERATED_ADDITIVES,
  NON_REFRIGERATED_ADDITIVES,
  TEMPERATURE,
  BEANS,
  SHOTS,
}

export function OrderItemModification(props: OrderItemModificationProps) {
  const { setCurrentOrder, kioskMenus } = useAppDataContext();
  const navigate = useNavigate();
  const {
    productVariationId = '5713582d-b715-42a4-895b-08bdd238964f',
    orderId,
  } = useParams();
  const [addItemToOrderResult, addItemToOrder] = useMutation(
    MUTATION_ADD_ITEM_TO_ORDER,
  );
  const [_, createModifiedProductVariation] = useMutation(
    MUTATION_CREATE_MODIFIED_PRODUCT_VARIATION,
  );
  const { pushGetOrderResponse } = useAppMockDataSubjects();

  const [addToOrderOpen, setAddToOrderOpen] = useState(false);
  const [loadingAddToOrder, setLoadingAddToOrder] = useState(false);

  const theme = useTheme();
  const { palette } = theme;

  const productVariation = productVariationViews.find(
    (view) => view.id === productVariationId,
  );

  const onAddItemToOrder = () => {
    setAddToOrderOpen(true);
    setLoadingAddToOrder(true);

    createModifiedProductVariation({
      productVariationId,
    })
      .then(({ data }) => {
        addItemToOrder({
          orderId,
          modifiedProductVariationId:
            data?.createModifiedProductVariation.modifiedProductVariation.id,
        }).then(({ data: data2 }) => {
          setLoadingAddToOrder(false);
          setCurrentOrder(data2.addItemToOrder.order);
        });
      })
      .catch((error) => {
        throw new Error(`Error adding item to Order. ${error}`);
      });
  };

  return (
    <>
      <LogoBar />
      <ProductVariationHero
        heroImage={productVariation?.image.sourceUrl!}
        sizeDisplayName={productVariation?.sizeDisplayName!}
        productDisplayName={productVariation?.productDisplayName!}
        productVariationDesc={productVariation?.description!}
        orderItemPrice={productVariation?.price!}
        orderItemCalories={productVariation?.calories!}
      />
      <Box flex="1 1 auto" bgcolor={palette.primary.dark} />
      <ActionBar>
        <Button
          variant="contained"
          onClick={() =>
            navigate(`/order/${orderId}/menu/${kioskMenus?.mainMenu.id}`)
          }>
          Back to Menu
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setCurrentOrder(undefined);
            navigate('/attract');
          }}>
          Cancel Order
        </Button>
        <Button variant="contained" onClick={onAddItemToOrder}>
          Add to Order
        </Button>
      </ActionBar>
      <AddToOrderDrawer
        open={addToOrderOpen}
        confirmationCopy="Got it! #orderItemName# was added to your order. What would you like to do next?"
        orderItemName={`${productVariation?.productDisplayName} ${productVariation?.sizeDisplayName}`}
        onClickOrderAnother={() =>
          navigate(`/order/${orderId}/menu/${kioskMenus?.mainMenu.id}`)
        }
        onClickCheckout={() => navigate(`/order/${orderId}/summary`)}
        loading={loadingAddToOrder}
      />
    </>
  );
}

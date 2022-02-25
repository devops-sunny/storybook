import {
  Component,
  ProductConfigurationQuery,
  useCreateModifiedProductVariationMutation,
  useCreateOrderItemMutation,
  useCreateOrderMutation,
  useProductConfigurationQuery,
} from '@bb/order/generated/graph';
import {
  Fab,
  FabProps,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { isNotNullish, useAppConfig } from '@bb/common';
import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PrimaryAppBar } from '../common/PrimaryAppBar';
import { useAppDataContext } from '../providers/AppDataProvider/AppDataProvider';
import { useParams } from 'react-router-dom';

type ProductDimension = {
  components: Array<Pick<Component, 'id' | 'name'>>;
};

export function ProductConfiguration() {
  const { productId } = useParams();

  const { storefrontId } = useAppConfig();
  const { currentOrder, setCurrentOrder } = useAppDataContext();

  const [selectedProductVariationId, setSelectedProductVariationId] =
    useState<string>();

  const [{ data }] = useProductConfigurationQuery({
    variables: { productId: productId! },
  });

  const [
    {
      data: createModifiedProductVariationData,
      fetching: createModifiedProductVariationFetching,
    },
    createModifiedProductVariation,
  ] = useCreateModifiedProductVariationMutation();
  const [
    { data: createOrderData, fetching: createOrderFetching },
    createOrder,
  ] = useCreateOrderMutation();
  const [
    { data: createOrderItemData, fetching: createOrderItemFetching },
    createOrderItem,
  ] = useCreateOrderItemMutation();

  const orderId = currentOrder?.id ?? createOrderData?.createOrder.order.id;
  const modifiedProductVariationId =
    createModifiedProductVariationData?.createModifiedProductVariation
      .modifiedProductVariation.id;

  useEffect(() => {
    if (orderId && modifiedProductVariationId) {
      createOrderItem({ orderId, modifiedProductVariationId });
    }
  }, [createOrderItem, modifiedProductVariationId, orderId]);

  useEffect(() => {
    if (createModifiedProductVariationData && !orderId) {
      createOrder({ storefrontId });
    }
  }, [createModifiedProductVariationData, createOrder, orderId, storefrontId]);

  useEffect(() => {
    if (createOrderData) {
      setCurrentOrder(
        currentOrder
          ? {
              ...currentOrder,
              id: createOrderData.createOrder.order.id,
            }
          : undefined,
      );
    }
  }, [createOrderData, currentOrder, setCurrentOrder]);

  if (createOrderItemData) {
    return <Navigate to={`/order/${currentOrder?.id}/summary`} />;
  }

  return (
    <ProductConfigurationPresentation
      data={data}
      onSelectProductVariationId={setSelectedProductVariationId}
      AddToCartButtonProps={{
        disabled:
          createModifiedProductVariationFetching ||
          createOrderFetching ||
          createOrderItemFetching ||
          Boolean(createOrderItemData),
      }}
      onClickAddToCart={() => {
        if (!selectedProductVariationId) {
          return;
        }

        createModifiedProductVariation({
          productVariationId: selectedProductVariationId,
        });
      }}
    />
  );
}

export type ProductConfigurationPresentationProps = {
  data?: ProductConfigurationQuery;
  onSelectProductVariationId?: (id: string) => void;
  onClickAddToCart?: () => void;
  AddToCartButtonProps?: FabProps;
};

export function ProductConfigurationPresentation(
  props: ProductConfigurationPresentationProps,
) {
  const {
    data,
    onSelectProductVariationId,
    onClickAddToCart,
    AddToCartButtonProps,
  } = props;

  const product = data?.product;

  const { spacing } = useTheme();

  const [selectedComponentIds, setSelectedComponentIds] =
    useState<Array<string>>();

  const dimensions = useMemo(
    () =>
      product?.variations
        .filter(isNotNullish)
        .map(({ rules }) => rules)
        .reduce<Array<ProductDimension>>((dimensions, rules) => {
          rules.filter(isNotNullish).forEach((rule, i) => {
            const dimension: ProductDimension = {
              components: [],
              ...dimensions[i],
            };

            const { components } = dimension;

            if (!components.some(({ id }) => id === rule.component.id)) {
              dimension.components = [...components, rule.component];
            }

            dimensions[i] = dimension;
          });

          return dimensions;
        }, []),
    [product?.variations],
  );

  const selectedProductVariation = useMemo(
    () =>
      product?.variations.filter(isNotNullish).find(
        ({ rules }) =>
          rules
            .filter(isNotNullish)
            .map(({ component }) => component.id)
            .sort()
            .toString() === [...(selectedComponentIds ?? [])].sort().toString(),
      ),
    [product?.variations, selectedComponentIds],
  );

  useEffect(() => {
    if (selectedProductVariation) {
      onSelectProductVariationId?.(selectedProductVariation.id);
    }
  }, [onSelectProductVariationId, selectedProductVariation]);

  useEffect(() => {
    if (product) {
      setSelectedComponentIds(
        product.variations[0]?.rules
          .filter(isNotNullish)
          .map(({ component }) => component.id),
      );
    }
  }, [product]);

  if (!product || !dimensions || !selectedComponentIds) {
    return (
      <PrimaryAppBar
        title="Loading..."
        leading={
          <IconButton color="inherit" edge="start" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        }
      />
    );
  }

  return (
    <>
      <PrimaryAppBar
        title={product.name}
        leading={
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 1 }}
            component={RouterLink}
            to="/">
            <ArrowBackIcon />
          </IconButton>
        }
      />
      <List>
        {dimensions.map(({ components }, i) => (
          <ListItem key={i}>
            {components.length === 1 ? (
              <ListItemText primary={components[0]?.name} />
            ) : (
              <Select
                value={selectedComponentIds?.[i]}
                onChange={({ target: { value: componentId } }) => {
                  setSelectedComponentIds((value) => {
                    const nextValue = [...(value ?? [])];
                    nextValue[i] = componentId as string;
                    return nextValue;
                  });
                }}>
                {components.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </ListItem>
        ))}
      </List>
      <Fab
        {...AddToCartButtonProps}
        onClick={onClickAddToCart}
        variant="extended"
        color="secondary"
        sx={{
          position: 'absolute',
          bottom: spacing(2),
          left: '50%',
          transform: 'translate(-50%, 0)',
        }}>
        <AddIcon sx={{ mr: 1 }} /> Add to Order
      </Fab>
    </>
  );
}

import { List, ListItemButton, ListItemText } from '@material-ui/core';
import {
  ProductMenuQuery,
  useProductMenuQuery,
} from '@bb/order/generated/graph';

import { PrimaryAppBar } from '../common/PrimaryAppBar';
import { Link as RouterLink } from 'react-router-dom';
import { isNotNullish } from '@bb/common';

export function ProductMenu() {
  const [{ data }] = useProductMenuQuery({});

  if (!data) {
    return null;
  }

  return <ProductMenuPresentation data={data} />;
}

type PresentationProps = {
  data: ProductMenuQuery;
};

export function ProductMenuPresentation(props: PresentationProps) {
  const { data } = props;

  return (
    <>
      <PrimaryAppBar title="Menu" />
      <List>
        {data.products.filter(isNotNullish).map(({ id, name }) => (
          <ListItemButton
            key={id}
            component={RouterLink}
            to={`/order/b034183c-6109-437c-9bdc-a0eb108df780/product/${id}`}>
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}

import { Order, OrderItem, Producer, User } from './entityTypes';

import { Kiosk } from './menuEntityTypes';

// These are all just duplicates of what is in the service code.
// It should all be replaced by generated GQL schema… once we get around to it

export type UrqlResponseType<T> = {
  data: T;
};

export type OrderQueryResponse = UrqlResponseType<{
  order: Order | undefined;
}>;
export type OrdersQueryResponse = UrqlResponseType<{
  orders: Order[];
}>;
export type AddItemToOrderMutationResponse = UrqlResponseType<{
  order: Order;
  item: OrderItem;
}>;
export type RemoveItemFromOrderMutationResponse = UrqlResponseType<{
  order: Order;
  orderItemId: string;
}>;

export type UserQueryResponse = UrqlResponseType<{
  user: User | undefined;
}>;
export type UsersQueryResponse = UrqlResponseType<{
  users: User[];
}>;

export type ProducersQueryResponse = UrqlResponseType<{
  producers: Producer[];
}>;

// for obtaining the menus and other Kiosk-specific data
// I THINK we will use a separate query to obtain the Producer IDs…
export type KioskQueryResponse = UrqlResponseType<Kiosk>;

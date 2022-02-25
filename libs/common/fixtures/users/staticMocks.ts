import { User } from '@bb/common/types/tmpTypes/entityTypes';

export const userNotPresent = undefined;

export const userPresent: User = Object.freeze({
  presentAt: new Date(),
  id: 'u1',
  identified: false,
});

export const mockAppUserIdentified: User = Object.freeze({
  presentAt: new Date(),
  id: 'app-user',
  identified: true,
  orderId: 'o1',
});

export const mockWalkupUserIdentified: User = Object.freeze({
  presentAt: new Date(),
  id: undefined,
  identified: true,
  orderId: 'o1',
});

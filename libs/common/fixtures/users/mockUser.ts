import { ChainableMockUser } from '@bb/common/types/tmpTypes/chainableTypes';
import { User } from '@bb/common/types/tmpTypes/entityTypes';
import { v4 as uuidv4 } from 'uuid';

export const mockUser = (params?: { user: User }): ChainableMockUser => {
  let value: User = params?.user
    ? { ...params.user }
    : {
        presentAt: new Date(),
        identified: false,
      };

  const chainableUser: ChainableMockUser = {
    value: () => ({ ...value }),

    createAppUser: () => {
      value = {
        presentAt: new Date(),
        id: uuidv4(),
        identified: true,
        orderId: uuidv4(),
      };
      return chainableUser;
    },

    createWalkupUser: () => {
      value = {
        presentAt: new Date(),
        id: undefined,
        identified: true,
        orderId: uuidv4(),
      };
      return chainableUser;
    },

    updatePresent: () => {
      value = {
        ...value,
        presentAt: new Date(),
      };
      return chainableUser;
    },
  };

  return chainableUser;
};

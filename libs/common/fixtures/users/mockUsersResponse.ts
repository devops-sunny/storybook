import { User } from '@bb/common/types/tmpTypes/entityTypes';
import { UsersQueryResponse } from '@bb/common/types/tmpTypes/responseTypes';

export const mockUsersResponse = (params: {
  users: User[];
}): UsersQueryResponse => {
  const { users } = params;
  return {
    data: {
      users,
    },
  };
};

export const mockUsersResponseAfterAllUsersUpdate = (params: {
  users: User[];
  updatedUsers: User[];
}): UsersQueryResponse => {
  const { users, updatedUsers } = params;
  return {
    data: {
      users: [...updatedUsers],
    },
  };
};

export const mockUsersResponseAfterOneUserUpdate = (params: {
  users: User[];
  updatedUser: User;
}): UsersQueryResponse => {
  const { users, updatedUser } = params;
  return {
    data: {
      users: [{ ...updatedUser }, ...users.slice(1)],
    },
  };
};

import {
  mockUsersResponseAfterAllUsersUpdate,
  mockUsersResponseAfterOneUserUpdate,
} from '@bb/common/fixtures/users/mockUsersResponse';

import { User } from '@bb/common/types/tmpTypes/entityTypes';
import { mockUser } from '@bb/common/fixtures/users/mockUser';

describe('Given a kiosk with NO Users', () => {
  const users: User[] = [];
  const updatedUser1: User = mockUser().value();
  const updatedUser2: User = mockUser().createAppUser().value();
  const updatedUser3: User = mockUser().createWalkupUser().value();
  const updatedUsers: User[] = [
    { ...updatedUser1 },
    { ...updatedUser2 },
    { ...updatedUser3 },
  ];

  describe('when mockUsersResponseAfterAllUsersUpdate is called with three users', () => {
    it('replaces Users with the array of provided Users', () => {
      const res = mockUsersResponseAfterAllUsersUpdate({
        users,
        updatedUsers,
      });
      expect(res).toEqual({
        data: {
          users: [...updatedUsers],
        },
      });
    });
  });
  describe('when mockUsersResponseAfterOneUserUpdate is called with a user', () => {
    it('replaces user[0] with the provided user', () => {
      const res = mockUsersResponseAfterOneUserUpdate({
        users,
        updatedUser: updatedUser3,
      });
      expect(res).toEqual({
        data: {
          users: [{ ...updatedUser3 }],
        },
      });
    });
  });
});

describe('Given a kiosk with two Users', () => {
  const user1: any = mockUser().value();
  const user2: any = mockUser().value();
  const users: User[] = [{ ...user1 }, { ...user2 }];
  const updatedUser1: any = mockUser().value();
  const updatedUser2: any = mockUser().createAppUser().value();
  const updatedUser3: any = mockUser().createWalkupUser().value();
  const updatedUsers: User[] = [
    { ...updatedUser1 },
    { ...updatedUser2 },
    { ...updatedUser3 },
  ];

  describe('when mockUsersResponseAfterAllUsersUpdate is called with three users', () => {
    it('replaces Users with the array of provided Users', () => {
      const res = mockUsersResponseAfterAllUsersUpdate({
        users,
        updatedUsers,
      });
      expect(res).toEqual({
        data: {
          users: [
            { ...updatedUser1 },
            { ...updatedUser2 },
            { ...updatedUser3 },
          ],
        },
      });
    });
  });
  describe('when mockUsersResponseAfterAllUsersUpdate is called with NO users', () => {
    it('clears the Users array', () => {
      const res = mockUsersResponseAfterAllUsersUpdate({
        users,
        updatedUsers: [],
      });
      expect(res).toEqual({
        data: {
          users: [],
        },
      });
    });
  });
  describe('when mockUsersResponseAfterOneUserUpdate is called with a user', () => {
    it('replaces user[0] with the provided user', () => {
      const res = mockUsersResponseAfterOneUserUpdate({
        users,
        updatedUser: { ...updatedUser3 },
      });
      expect(res).toEqual({
        data: {
          users: [{ ...updatedUser3 }, { ...user2 }],
        },
      });
    });
  });
});

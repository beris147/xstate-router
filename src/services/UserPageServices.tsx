import USERS_DATA, { UserT } from '../assets/userData';
import { setTimeoutPromise } from '../utils/functions';

export const getUserPageServices = (id: string) => {
  return {
    fetchUser: async (): Promise<UserT> => {
      // mock api
      await setTimeoutPromise(300);
      const user = USERS_DATA.find((user) => user.id === id);
      if (!user) throw new Error('user not found');
      return user;
    },
  };
};

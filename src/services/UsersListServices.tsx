import USERS_DATA, { UserT } from '../assets/userData';
import { setTimeoutPromise } from '../utils/functions';

export const getUsersListServices = () => {
  return {
    fetchAllUsers: async (): Promise<Array<UserT>> => {
      // mock api call
      await setTimeoutPromise(500);
      return USERS_DATA;
    },
  };
};

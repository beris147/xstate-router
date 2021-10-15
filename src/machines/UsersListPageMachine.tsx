import { assign, createMachine } from 'xstate';
import { UserT } from '../assets/userData';

interface UsersListContextI {
  usersList: Array<UserT> | undefined;
}

export const getUserListPageMachine = (services: Partial<any>) => {
  const actions: Partial<any> = {
    setUsers: assign({
      usersList: (_context, event: any): Array<UserT> => event.data,
    }),
  };
  const options: Partial<any> = { actions, services };
  return createMachine<UsersListContextI>(
    {
      id: 'userPage',
      initial: 'loading',
      context: {
        usersList: undefined,
      },
      states: {
        loading: {
          invoke: {
            src: 'fetchAllUsers',
            onDone: { target: 'ok', actions: 'setUsers' },
            onError: 'error',
          },
        },
        ok: {
          type: 'final',
        },
        error: {
          type: 'final',
        },
      },
    },
    options
  );
};

import { createMachine, assign } from 'xstate';
import { UserT } from '../assets/userData';

interface UserPageContextI {
  user: UserT | undefined;
  error: Error | undefined;
}

export const getUserPageMachine = (services: Partial<any>) => {
  const actions = {
    setUser: assign({
      user: (_context, event: any): UserT | undefined => {
        const user = event.data;
        if (user && !(user as UserT).displayName) {
          throw new Error('event fetchUser does not returned an user');
        }
        return event.data;
      },
    }),
    setError: assign({
      error: (_context, event: any) => event.data,
    }),
  };
  const options: Partial<any> = { actions, services };
  return createMachine<UserPageContextI>(
    {
      id: 'userPage',
      initial: 'loading',
      context: {
        user: undefined,
        error: undefined,
      },
      states: {
        loading: {
          invoke: {
            src: 'fetchUser',
            onDone: { target: 'ok', actions: 'setUser' },
            onError: { target: 'error', actions: 'setError' },
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

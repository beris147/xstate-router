import React, { useContext } from 'react';
import { useActor, useMachine } from '@xstate/react';
import { RouteContext } from '../../provider/RouteProvider';
import { getUserPageMachine } from '../../machines/UserPageMachine';
import { getUserPageServices } from '../../services/UserPageServices';

const UserPage = () => {
  const routeService = useContext(RouteContext);
  const [routeState] = useActor(routeService);
  const { id } = routeState.context.params;
  const userPageServices = getUserPageServices(id);
  const userPageMachine = getUserPageMachine(userPageServices);
  const [current] = useMachine(userPageMachine);
  const { user, error } = current.context;
  return (
    <>
      {current.matches('loading') ? <p>loading...</p> : null}
      {current.matches('ok') && user ? (
        <div>
          <h1>User {user.displayName} page</h1>
          <p>
            {user.displayName} - {user.email}
          </p>
        </div>
      ) : null}
      {current.matches('error') && error ? <p>{error.message}</p> : null}
    </>
  );
};

export default UserPage;

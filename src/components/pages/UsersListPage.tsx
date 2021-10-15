import React, { useContext } from 'react';
import { RouteContext } from '../../provider/RouteProvider';
import { getUsersListServices } from '../../services/UsersListServices';
import { getUserListPageMachine } from '../../machines/UsersListPageMachine';
import { useMachine } from '@xstate/react';

const UsersListPage = () => {
  const { send } = useContext(RouteContext);
  const usersListServices = getUsersListServices();
  const usersListMachine = getUserListPageMachine(usersListServices);
  const [current] = useMachine(usersListMachine);
  const { usersList } = current.context;
  return (
    <div>
      <h1>Users list page</h1>
      <p>Users List</p>
      <ul>
        {current.matches('loading') ? <p>loading...</p> : null}
        {current.matches('ok') && usersList
          ? usersList.map((user) => (
              <div key={user.id}>
                <li>
                  <h3>{user.displayName}</h3>
                  <p>{user.email}</p>
                  <button
                    onClick={() => {
                      window.history.pushState(null, '', `/user/${user.id}`);
                      send('GO_USER', { id: user.id });
                    }}
                  >
                    Profile
                  </button>
                </li>
              </div>
            ))
          : null}
        {current.matches('error') ? <p>Something went wrong</p> : null}
      </ul>
    </div>
  );
};

export default UsersListPage;

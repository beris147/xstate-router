import React, { useContext } from 'react';
import { RouteContext } from '../../provider/RouteProvider';

const Header = () => {
  const { send } = useContext(RouteContext);
  return (
    <div>
      <button type='button' onClick={() => send('GO_HOME')}>
        HOME
      </button>
      <button type='button' onClick={() => send('GO_LOGIN')}>
        LOG IN
      </button>
      <button type='button' onClick={() => send('GO_USERS_LIST')}>
        USERS
      </button>
    </div>
  );
};

export default Header;

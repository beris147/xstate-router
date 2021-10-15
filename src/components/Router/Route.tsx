import React, { useContext } from 'react';
import { useSelector } from '@xstate/react';
import { State } from 'xstate';
import { RouteContext } from '../../provider/RouteProvider';

type SwitchRouterPropsT = {
  page: string;
  children: any;
};

const Route = (props: SwitchRouterPropsT) => {
  const routeService = useContext(RouteContext);
  const isThisPage = useSelector(routeService, (state: State<any>) =>
    state.matches(props.page)
  );
  return <>{isThisPage ? props.children : null}</>;
};

export default Route;

import { useInterpret } from '@xstate/react';
import React from 'react';
import { Interpreter } from 'xstate';
import routeMachine, {
  RouteContextI,
  RouteEventT,
} from '../machines/RouteMachine';

export const RouteContext = React.createContext<
  Interpreter<
    RouteContextI,
    any,
    RouteEventT,
    {
      value: any;
      context: RouteContextI;
    }
  >
>(null as any);

const RouteProvider = ({ children }: any) => {
  const routeService = useInterpret(routeMachine);
  return (
    <RouteContext.Provider value={routeService}>
      {children}
    </RouteContext.Provider>
  );
};

export default RouteProvider;

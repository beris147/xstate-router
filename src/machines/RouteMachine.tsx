import { createMachine, assign } from 'xstate';

export interface RouteContextI {
  params: any;
}

export type RouteEventT = {
  type: 'GO_LOGIN' | 'GO_HOME' | 'GO_USERS_LIST' | 'GO_USER';
};

export const pages = {
  HOME_PAGE: 'homePage',
  LOGIN_PAGE: 'loginPage',
  USER_PAGE: 'userPage',
  USER_PROFILE_PAGE: 'userProfilePage',
  USERS_LIST_PAGE: 'usersListPage',
  NOT_FOUND_PAGE: 'notFoundPage',
};

const pathToRegex = (path: string): RegExp =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const locationMatchesPath = (location: string, path: string): boolean =>
  location.match(pathToRegex(path)) !== null;

const getRouteParams = (location: string, path: string): any => {
  const locationProperties = location.split('/').slice(1);
  const pathProperties = path.split('/').slice(1);
  if (locationProperties.length !== pathProperties.length) {
    throw new Error(
      'bad route: location and path properties are not the same size'
    );
  }
  let paramsJSON: any = {};
  locationProperties.forEach((locationProperty, idx) => {
    const pathProperty = pathProperties[idx];
    if (locationProperty !== pathProperty && pathProperty[0] !== ':') {
      throw new Error('path params should be defined with ":"');
    }
    if (locationProperty !== pathProperty) {
      paramsJSON[pathProperty.slice(1)] = locationProperty;
    }
  });
  return paramsJSON;
};

const routeMachine = createMachine<RouteContextI, RouteEventT>(
  {
    id: 'router',
    initial: 'startUp',
    on: {
      GO_LOGIN: { target: pages.LOGIN_PAGE },
      GO_HOME: { target: pages.HOME_PAGE },
      GO_USERS_LIST: { target: pages.USERS_LIST_PAGE },
      GO_USER: {
        target: pages.USER_PAGE,
        cond: 'verifyUserId',
        actions: 'setId',
      },
    },
    context: {
      params: undefined,
    },
    states: {
      startUp: {
        always: [
          {
            target: pages.HOME_PAGE,
            cond: { type: 'verifyMultipleRoutes', paths: ['/', '/home'] },
          },
          {
            target: pages.LOGIN_PAGE,
            cond: { type: 'verifyRoute', path: '/login' },
          },
          {
            target: pages.USERS_LIST_PAGE,
            cond: { type: 'verifyRoute', path: '/users' },
          },
          {
            target: pages.USER_PAGE,
            cond: { type: 'verifyRoute', path: '/user/:id' },
            actions: { type: 'setParams', path: '/user/:id' },
          },
          {
            target: pages.USER_PROFILE_PAGE,
            cond: { type: 'verifyRoute', path: '/user/:id/profile' },
          },

          { target: pages.NOT_FOUND_PAGE },
        ],
      },
      homePage: { entry: { type: 'setURL', path: '/' } },
      loginPage: { entry: { type: 'setURL', path: '/login' } },
      usersListPage: { entry: { type: 'setURL', path: '/users' } },
      userPage: { entry: { type: 'setURLWithParams', path: '/user/:id' } },
      userProfilePage: {
        entry: { type: 'setURL', path: '/user/:id/profile' },
      },
      notFoundPage: {},
    },
  },
  {
    guards: {
      verifyRoute: (_context, _event, { cond }: any) => {
        const location = window.location.pathname;
        const path = cond.path;
        return locationMatchesPath(location, path);
      },
      verifyMultipleRoutes: (_context, _event, { cond }: any) => {
        const location = window.location.pathname;
        return cond.paths.reduce(
          (res: boolean, path: string) =>
            res || locationMatchesPath(location, path),
          false
        );
      },
      verifyUserId: (_context, event: any) => {
        if ('id' in event === false || typeof event.id !== 'string') {
          throw new Error('bad request, no user id provided');
        }
        return true;
      },
    },
    actions: {
      setId: assign<RouteContextI, RouteEventT>((_context, event: any) => {
        const id = event.id;
        return { params: { id } };
      }),
      setURL: (_context, _event, { action }: any) => {
        window.history.pushState(null, '', action.path);
      },
      setURLWithParams: (context, _event, { action }: any) => {
        const pathProperties = action.path.split('/').slice(1);
        const { params } = context;
        let url = '';
        pathProperties.forEach((pathProperty: string) => {
          url += '/';
          if (pathProperty[0] === ':') {
            const property = pathProperty.slice(1);
            if (!params[property]) {
              throw new Error(`${pathProperty} not in found in context.params`);
            }
            url += params[property];
          } else {
            url += pathProperty;
          }
        });
        window.history.pushState(params, '', url);
      },
      setParams: assign<RouteContextI, RouteEventT>(
        (_context, _event, { action }) => {
          // console.log(_event.type);
          const path = action.path;
          const params = getRouteParams(window.location.pathname, path);
          // console.log(params);
          return { params };
        }
      ),
    },
  }
);

export default routeMachine;

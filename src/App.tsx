import React from 'react';
import './App.scss';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UsersPage from './components/pages/UsersListPage';
import { pages } from './machines/RouteMachine';
import Header from './components/header/Header';
import Route from './components/Router/Route';
import UserPage from './components/pages/UserPage';

const App = () => {
  return (
    <div>
      <Header />
      <Route page={pages.HOME_PAGE}>
        <HomePage />
      </Route>
      <Route page={pages.LOGIN_PAGE}>
        <LoginPage />
      </Route>
      <Route page={pages.USERS_LIST_PAGE}>
        <UsersPage />
      </Route>
      <Route page={pages.USER_PAGE}>
        <UserPage />
      </Route>
      <Route page={pages.NOT_FOUND_PAGE}>
        <NotFoundPage />
      </Route>
    </div>
  );
};

export default App;

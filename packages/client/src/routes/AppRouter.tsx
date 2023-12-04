import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  MainPage,
  ForumPage,
  GamePage,
  LeaderBoardPage,
  ProfilePage,
  TopicPage,
  RegistrationPage,
  Error400Page,
  Error500Page,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTER_URLS } from '../constants';
import { InformationsPage } from '../pages/GamePages/InformationsPage/InformationsPage';
import { InformationFactPage } from '../pages/GamePages/InformationFactPage/InformationFactPage';

/**
 * Компонент-роутер
 */
export const AppRouter: FC = () => (
  <Routes>
    <Route element={<Error400Page />} path='*' />
    <Route element={<Error500Page />} path={ROUTER_URLS.ServerError} />
    <Route element={<PublicRoute />}>
      <Route element={<LoginPage />} path={ROUTER_URLS.Login} />
      <Route element={<RegistrationPage />} path={ROUTER_URLS.Registration} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route element={<MainPage />} path={ROUTER_URLS.Main} />
      <Route element={<GamePage />} path={ROUTER_URLS.Game} />
      <Route element={<LeaderBoardPage />} path={ROUTER_URLS.Leaderboard} />
      <Route element={<ProfilePage />} path={ROUTER_URLS.Profile} />
      <Route path={ROUTER_URLS.Forum}>
        <Route index element={<ForumPage />} />
        <Route element={<TopicPage />} path={ROUTER_URLS.ForumTopic} />
      </Route>
      <Route path={ROUTER_URLS.Informations}>
        <Route index element={<InformationsPage />} />
        <Route element={<InformationFactPage />} path={ROUTER_URLS.InformationFact} />
      </Route>
    </Route>
  </Routes>
);

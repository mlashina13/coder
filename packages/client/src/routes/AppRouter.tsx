import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  MainPage,
  ForumPage,
  GamePage,
  LeaderBoardPage,
  ProfilePage,
  TopicPage,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTER_URLS } from '../constants';

export const AppRouter: React.FC = () => (
  <Routes>
    <Route element={<PublicRoute />}>
      <Route element={<LoginPage />} path={ROUTER_URLS.Login} />
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
    </Route>
  </Routes>
);

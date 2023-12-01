import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '../stores';
import {
  LoginPage,
  MainPage,
  ForumPage,
  GamePage,
  LeaderBoardPage,
  ProfilePage,
  TopicPage,
  RegistrationPage,
} from '../pages';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { ROUTER_URLS } from '../constants';
import { InformationsPage } from '../pages/GamePages/InformationsPage/InformationsPage';
import { InformationFactPage } from '../pages/GamePages/InformationFactPage/InformationFactPage';

export const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();

  useEffect(() => {
    if (!userData) {
      navigate(ROUTER_URLS.Login);
    }
  }, [userData]);

  return (
    <Routes>
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
};

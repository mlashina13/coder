import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTER_URLS } from './constants';
import { AppRouter } from './routes/AppRouter';
import { UserStoreProvider } from './stores/UserStore';
import { UserData } from './types/common';
import { Nullable } from './types/utils';

export default function App() {
  const user = localStorage.getItem('user');

  const changeUserData = (data: Nullable<UserData>) => {
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.clear();
    }
  };

  return (
    <UserStoreProvider
      value={{
        setUserData: changeUserData,
        userData: user ? JSON.parse(user) : null,
      }}
    >
      <AppRouter />
    </UserStoreProvider>
  );
}

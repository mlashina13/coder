import React, { useState } from 'react';
import { AppRouter } from './routes/AppRouter';
import { UserStoreProvider } from './stores/UserStore';
import { UserData } from './types/common';
import { Nullable } from './types/utils';

export default function App() {
  const [userData, setUserData] = useState<Nullable<UserData>>(null);

  const changeUserData = (data: Nullable<UserData>) => {
    setUserData(data);
  };

  return (
    <UserStoreProvider value={{ userData, setUserData: changeUserData }}>
      <AppRouter />;
    </UserStoreProvider>
  );
}

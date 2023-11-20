import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
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
      <Box>
        <Typography>The coder game!</Typography>
      </Box>
    </UserStoreProvider>
  );
}

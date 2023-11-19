import React from 'react';
import { Box, Typography } from '@mui/material';
import GameField from './components/GameField/GameField';

export default function App() {
  return (
    <Box>
      <Typography>The coder game!</Typography>
      <GameField />
    </Box>
  );
}

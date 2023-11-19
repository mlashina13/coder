import './SettingsGamePage.scss';
import React from 'react';
import { Box } from '@mui/material';
import { SettingsGameForm } from './SettingsGameForm/SettingsGameForm';
import { SettingsGameInfo } from './SettingsGameInfo/SettingsGameInfo';
import { SettingsProvide } from './SettingsProvider';

/**
 * Cтраница настройки и запуска игры
 * */
export const SettingsGamePage: React.FC = () => (
  <SettingsProvide>
    <Box className='settings-game-page'>
      <SettingsGameForm />
      <SettingsGameInfo />
    </Box>
  </SettingsProvide>
);

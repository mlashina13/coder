import './SettingsGameInfo.scss';
import { Container } from '@mui/material';
import React, { FC, useState } from 'react';
import { Image } from '../../../../components/common/Image/Image';
import { LockIcon } from '../../../../assets/icons/LockIcon';
import { FakeInfoList } from './FakeInfoList';
import { useSettingGame } from '../SettingsProvider';
import { GameField } from '../../../../components/GameField/GameField';
import { getImage } from '../../../../utils';
/**
 *  Компонент отображения "Интересных фактов" при выйгрыше в игре
 */
export const SettingsGameInfo: FC = () => {
  const [image, setImage] = useState(() => getImage(FakeInfoList));
  const { settings } = useSettingGame();
  /**
   * Условие отображения компонента, после старта, вместо "Интересных фактов отображается игра"
   */
  if (!settings.visible) {
    return (
      <Container className='settings-game-info'>
        <LockIcon width='300' height='300' color='#ddd' className='settings-game-info__icon' />
        <Image src={image} alt='' className='settings-game-info__image' />
      </Container>
    );
  }

  return (
    <Container className='settings-game-info'>
      <GameField />
    </Container>
  );
};

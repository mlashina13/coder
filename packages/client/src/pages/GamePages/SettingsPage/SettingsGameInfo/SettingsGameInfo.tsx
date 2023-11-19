import './SettingsGameInfo.scss';
import { Container } from '@mui/material';
import React, { FC, useState } from 'react';
import { Image } from '../../../../components/common/Image/Image';
import { LockIcon } from '../../../../assets/icons/LockIcon';
import { ImagesList } from './ImagesList';
import { SettingGame } from '../SettingsProvider';
import GameField from '../../../../components/GameField/GameField';

/**
 *  Функция рандомного вычисления
 *  */
function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

/**
 *  Функция вычисления элемента в масстеве базы знаний для отображения "Интересных фактов"
 *  */
function getImage() {
  // TODO реализовать механизм вычисления отображения новой информации "Интересных фактов"
  const random = getRandomInt(3);
  return ImagesList.length >= random ? ImagesList[random].src : '';
}

/**
 *  Компонент отображения "Интересных фактов" при выйгрыше в игре
 *  */
export const SettingsGameInfo: FC = () => {
  const [image, setImage] = useState(() => getImage());
  const { state } = SettingGame();

  /**
   * Условие отображения компонента, после старта, вместо "Интересных фактов отображается игра"
   * * */
  if (!state.visible) {
    return (
      <Container className='settings-game-info'>
        <LockIcon width='300' height='300' color='#ddd' className='settings-game-info__icon' />
        <Image src={image} alt='' />
      </Container>
    );
  }

  return (
    <Container className='settings-game-info'>
      <GameField />
    </Container>
  );
};

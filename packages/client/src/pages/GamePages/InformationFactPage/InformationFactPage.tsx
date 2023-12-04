import './InformationFactPage.scss';
import React, { FC, useState } from 'react';
import { Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Layout } from '../../../components/index';
import { Menu } from '../../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../../constants/routes';
import { Image } from '../../../components/common/Image/Image';
import { FakeInfoList } from '../SettingsPage/SettingsGameInfo/FakeInfoList';
import { Title } from '../../../components/common/Title/Title';
import { SettingsGameProviderState } from '../SettingsPage/SettingsGameProviderTypes';
import { ImageInterface } from '../SettingsPage/SettingsGameInfo/ImageInterface';

/**
 * Страница информации
 * */
export const InformationFactPage: FC = () => {
  const { infoId } = useParams();
  const image: ImageInterface =
    FakeInfoList.find((item) => item.id.toString() === infoId) || FakeInfoList[0];
  // TODO доработать механизм получения данных из url
  return (
    <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='3' />}>
      <Container className='information-fact-page'>
        <Title className='information-fact-page__title'>{image?.title}</Title>
        <Container className='information-fact-page__block'>
          <Paper className='information-fact-page__block__description'>{image?.description}</Paper>
          <Image src={image?.src} alt='' className='information-fact-page__block__image' />
        </Container>
      </Container>
    </Layout>
  );
};

import './InformationsPage.scss';
import React, { FC, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Layout } from '../../../components/index';
import { Menu } from '../../../components/common/menu/Menu';
import { SUBMENU_ROUTES } from '../../../constants/routes';
import { FakeInfoList } from '../SettingsPage/SettingsGameInfo/FakeInfoList';
import { Image } from '../../../components/common/Image/Image';
import { ImageInterface } from '../SettingsPage/SettingsGameInfo/ImageInterface';
import { Title } from '../../../components/common/Title/Title';

export const InformationsPage: FC = () => {
  const [images, setImages] = useState<Array<ImageInterface>>([]);

  /**
   * Устанавливаем список Интересных фактов
   * */
  useEffect(() => {
    setImages(FakeInfoList);
  }, []);

  return (
    <Layout subMenu={<Menu menuItems={SUBMENU_ROUTES} defaultSelected='3' />}>
      <Container className='information-page'>
        {images.map((image) => (
          <Box component={Link} to={`/info/${image.id}`} key={image.id}>
            <Title>{image.title}</Title>
            <Image src={image.src} alt='' className='information-page__image' />
          </Box>
        ))}
      </Container>
    </Layout>
  );
};

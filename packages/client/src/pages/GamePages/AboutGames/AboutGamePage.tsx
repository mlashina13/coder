import './AboutGamePage.scss';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { Title } from '../../../components/common/Title/Title';

/* Страница описания правил игры */
export const AboutGamePage: React.FC = () => (
  <Box className='about-game-page'>
    <Title component='h2' align='center'>
      Интеллектуальная игра{' '}
      <span className='about-game-page__info-text'>&quot;Секретный код&quot;</span>
    </Title>
    <Typography>
      <strong>Цель игры:</strong>
    </Typography>
    <List className='about-game-page__info-level'>
      <ListItem>
        <ListItemText>
          <span className='select'>Легкий уровень: </span>
          <span>
            необходимо отгадать комбинацию, сформированную из фишек с <strong>уникальными</strong>{' '}
            цветами.
          </span>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <span className='select'>Сложный уровень: </span>
          <span>
            необходимо отгадать комбинацию, сформированную из <strong>любых</strong> цветных фишек.
          </span>
        </ListItemText>
      </ListItem>
    </List>
    <Typography mt={2}>
      <strong>Состав игры:</strong>
    </Typography>
    <List>
      <ListItem>
        <ListItemText>- игровое поле</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          - фишки от 4-7 цветов (например, красные, синие, зеленые, желтые, фиолетовые, черные и
          белые).
        </ListItemText>
      </ListItem>
    </List>
    <Typography mb={2}>
      Цветные фишки используются для самого кода,
      <figure className='circle blue' />
      <figure className='circle green' />
      <figure className='circle red' />
      <figure className='circle yellow' />
      <figure className='circle orange' />
      <figure className='circle purple' />
    </Typography>
    <Typography mb={3}>
      Черные и белые - для оценки правильности кода.
      <figure className='circle white' />
      <figure className='circle black' />
    </Typography>
    <Typography mb={1}>
      <strong>Правила игры:</strong>
    </Typography>
    <Typography variant='body1'>
      <strong>Кодировщик</strong> &quot;загадывает&quot; код из 4 любых неповторяющихся разноцветных
      фишек и прячет его от Хакера внизу игрового поля.
    </Typography>
    <Typography variant='body1'>
      <strong>Хакер</strong>, должен угадать, то есть, &quot;взломать&quot; код.
    </Typography>
    <Typography variant='body1'>
      Хакер делает ход, располагая 4 разных, неповторяющихся по цвету фишки в одну линию. Это
      предполагаемая комбинация. Кодировщик берет черные и белые фишки, которые он использует для
      оценки правильности расположения фишки в загаданном коде. Белая фишка ставится, если угадан
      цвет, но не угадано расположение. Черная фишка ставится, если угаданы и цвет и расположение.
      Сколько правильно угаданных фишек, столько и белых и черных фишек, но Кодировщик не указывает,
      какие именно. Потом Хакер снова делает ход, а Кодировщик &quot;оценивает&quot;. У Хакера 8
      попыток, за которые он должен взломать код.
    </Typography>
  </Box>
);

import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { Button } from '../common';
import type { ErrorProps } from './ErrorProps';
import './errorStyles.scss';

export const Error: FC<ErrorProps> = ({ onClick, icon, code, description, buttonLabel }) => (
  <Box className='error-page__content' textAlign='center'>
    <>
      {icon}
      <Typography variant='h2' gutterBottom className='error-page__code'>
        {code}
      </Typography>
      <Typography variant='body1' paragraph className='error-page__description'>
        {description}
      </Typography>
      <Button onClick={onClick} type='submit' label={buttonLabel} className='error-page__button' />
    </>
  </Box>
);

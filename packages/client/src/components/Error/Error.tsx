import React, { ReactElement } from 'react';
import { Typography, Box } from '@mui/material';
import { Button } from '../common';
import './errorStyles.scss';

interface ServerErrorProps {
  onClick: () => Promise<void>;
  icon: ReactElement;
  code: number;
  description: string;
  buttonText: string;
}

export const Error: React.FC<ServerErrorProps> = ({
  onClick,
  icon,
  code,
  description,
  buttonText,
}) => (
  <Box className='error-page__content' textAlign='center'>
    <>
      {icon}
      <Typography variant='h2' gutterBottom className='error-page__code'>
        {code}
      </Typography>
      <Typography variant='body1' paragraph className='error-page__description'>
        {description}
      </Typography>
      <Button onClick={onClick} type='submit' label={buttonText} className='error-page__button' />
    </>
  </Box>
);

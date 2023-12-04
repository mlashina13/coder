import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import clsx from 'clsx';
import { Button } from '../common';
import type { ErrorProps } from './ErrorProps';
import './errorStyles.scss';

/**
 * Компонент отображения ошибки
 */
export const Error: FC<ErrorProps> = ({
  actionText,
  className,
  code,
  description,
  icon,
  onActionClick,
  title,
}) => (
  <Box className={clsx('error-component__content', className)} textAlign='center'>
    {icon && <Box className='error-component__icon'>{icon}</Box>}
    {code && (
      <Typography variant='h2' gutterBottom className='error-component__code'>
        {code}
      </Typography>
    )}
    {title && (
      <Typography variant='body1' gutterBottom className='error-component__title'>
        {title}
      </Typography>
    )}
    {description && (
      <Typography variant='body1' paragraph className='error-component__description'>
        {description}
      </Typography>
    )}
    {onActionClick && (
      <Button
        onClick={onActionClick}
        type='submit'
        label={actionText}
        className='error-component__button'
      />
    )}
  </Box>
);

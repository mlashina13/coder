/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Typography } from '@mui/material';
import clsx from 'clsx';

import { TitleProps } from './TitleProps';

import './titleStyles.scss';

export const Title: React.FC<TitleProps> = ({ variant = 'h1', className, children, ...props }) => (
  <Typography className={clsx('title', className)} variant={variant} {...props}>
    {children}
  </Typography>
);

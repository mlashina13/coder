/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import { Button as MuiButton } from '@mui/material';

import { ButtonProps } from './ButtonProps';

import './buttonStyles.scss';

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  label,
  className,
  ...props
}) => (
  <MuiButton className={clsx('button', className)} variant={variant} {...props}>
    {label}
  </MuiButton>
);

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@mui/material';
import clsx from 'clsx';

import { InputProps } from './InputProps';

import './inputStyles.scss';

export const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <TextField className={clsx('input', className)} {...props} />
);

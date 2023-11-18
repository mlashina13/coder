/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import clsx from 'clsx';

import { CheckboxProps } from './CheckboxProps';

import './checkboxStyles.scss';

export const Checkbox: React.FC<CheckboxProps> = ({
  label = '',
  name,
  onChange,
  className,
  checkboxProps,
}) => (
  <FormControlLabel
    className={clsx('checkbox', className)}
    control={<MuiCheckbox {...checkboxProps} />}
    label={label}
    name={name}
    onChange={onChange}
  />
);

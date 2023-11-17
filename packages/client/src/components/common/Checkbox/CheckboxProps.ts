import React from 'react';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';

export interface CheckboxProps {
  className?: string;
  label?: string;
  name?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.SyntheticEvent, checked: boolean) => void;
  checkboxProps?: MuiCheckboxProps;
}

import React from 'react';
import { ButtonProps as MuiButtonProps, ButtonTypeMap } from '@mui/material';

export type ButtonProps<
  RootComponent extends React.ElementType = ButtonTypeMap['defaultComponent'],
  AdditionalProps = unknown
> = { label?: string } & MuiButtonProps<RootComponent, AdditionalProps>;

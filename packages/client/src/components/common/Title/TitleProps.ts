import React from 'react';
import { TypographyProps, TypographyTypeMap } from '@mui/material';

export type TitleProps<
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
  AdditionalProps = unknown
> = TypographyProps<RootComponent, AdditionalProps>;

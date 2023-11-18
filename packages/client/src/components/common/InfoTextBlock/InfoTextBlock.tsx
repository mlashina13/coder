import React from 'react';
import clsx from 'clsx';
import { Box, InputLabel } from '@mui/material';
import { InfoTextBlockProps } from './InfoTextBlockProps';

import './infoTextBlockStyles.scss';

export const InfoTextBlock: React.FC<InfoTextBlockProps> = ({
  label,
  className,
  labelClassName,
  value,
  valueClassName,
}) => (
  <Box className={clsx('info-text-block', className)}>
    <InputLabel className={clsx('info-text-block__label', labelClassName)}>{label}</InputLabel>
    <InputLabel className={clsx('info-text-block__value', valueClassName)}>
      {value ?? ''}
    </InputLabel>
  </Box>
);

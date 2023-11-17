import React from 'react';
import clsx from 'clsx';

import { Box } from '@mui/material';
import { DialogLayoutProps } from './DialogLayoutProps';

import './dialogLayoutStyles.scss';

export const DialogLayout: React.FC<DialogLayoutProps> = ({
  children,
  clasName,
  contentClassName,
  headerClassName,
}) => (
  <Box className={clsx('dialog-layout', clasName)}>
    <Box className={clsx('dialog-layout__header', headerClassName)} />
    <Box className={clsx('dialog-layout__content', contentClassName)}>{children}</Box>
  </Box>
);

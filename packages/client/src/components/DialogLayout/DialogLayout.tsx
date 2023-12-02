import React from 'react';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { DialogLayoutProps } from './DialogLayoutProps';
import { AuthChecker } from '../AuthChecker';
import './dialogLayoutStyles.scss';

/**
 * Layout для страниц-диалогов
 */
export const DialogLayout: React.FC<DialogLayoutProps> = ({
  children,
  className,
  contentClassName,
  headerClassName,
}) => (
  <AuthChecker>
    <Box className={clsx('dialog-layout', className)}>
      <Box className={clsx('dialog-layout__header', headerClassName)} />
      <Box className={clsx('dialog-layout__content', contentClassName)}>{children}</Box>
    </Box>
  </AuthChecker>
);

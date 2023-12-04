import { FC } from 'react';
import { Box, Divider } from '@mui/material';
import { Header } from './header';
import { NavigationPanel } from './navigationPanel';
import { LayoutProps } from './LayoutProps';
import { AuthChecker } from '../AuthChecker';
import { ErrorMessage } from '../ErrorMessage';
import './layoutStyles.scss';

/**
 * Компонент шаблона страницы
 */
export const Layout: FC<LayoutProps> = (props) => {
  const { children, subMenu, title } = props;

  return (
    <AuthChecker>
      <ErrorMessage />
      <Box className='layout'>
        <Header title={title} />
        <NavigationPanel />
        <Divider className='layout__divider' />
        {subMenu}
        <Box className='layout__content'>{children}</Box>
      </Box>
    </AuthChecker>
  );
};

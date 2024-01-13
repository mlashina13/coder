import React, { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Добавить диалог"
 */
export const MoonIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = 'var(--icons-color)', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      stroke={color}
      fill='none'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96' />
    </svg>
  );
};

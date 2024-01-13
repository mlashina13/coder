import React, { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Добавить диалог"
 */
export const SunIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = 'var(--icons-color)', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      fill={color}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM4 10.5H1v2h3zm9-9.95h-2V3.5h2zm7.45 3.91-1.41-1.41-1.79 1.79 1.41 1.41zm-3.21 13.7 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5v2h3v-2zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6m-1 16.95h2V19.5h-2zm-7.45-3.91 1.41 1.41 1.79-1.8-1.41-1.41z' />
    </svg>
  );
};

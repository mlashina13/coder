import { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Мусорная корзина"
 */
export const TrashIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = '#525252', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      fill='none'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 1.5V2.5H3C2.44772 2.5 2 2.94772 2 3.5V4.5C2 5.05228 2.44772 5.5 3 5.5H21C21.5523 
            5.5 22 5.05228 22 4.5V3.5C22 2.94772 21.5523 2.5 21 2.5H16V1.5C16 0.947715 15.5523 0.5 15 
            0.5H9C8.44772 0.5 8 0.947715 8 1.5Z'
        fill={color}
      />
      <path
        d='M3.9231 7.5H20.0767L19.1344 20.2216C19.0183 21.7882 17.7135 23 16.1426 23H7.85724C6.28636 
            23 4.98148 21.7882 4.86544 20.2216L3.9231 7.5Z'
        fill={color}
      />
    </svg>
  );
};

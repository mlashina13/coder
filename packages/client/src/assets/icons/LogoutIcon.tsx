import React, { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Выход"
 */
export const LogoutIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = 'var(--icons-color)', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M 4.189 18.75 L 4.939 19.5 L 13.939 19.5 L 14.689 18.75 L 14.689 5.25 L 13.939 4.5 L 4.939 4.5
                L 4.189 5.25 L 4.189 7.5 L 5.689 7.5 L 5.689 6 L 13.189 6 L 13.189 18 L 5.689 18 L 5.689 16.5
                L 4.189 16.5 L 4.189 18.75 Z'
        fill={color}
        style={{
          transformBox: 'fill-box',
          transformOrigin: '50% 50%',
        }}
        transform='matrix(-1, 0, 0, -1, 0, 0.000001)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M 11.561 11.25 L 18.75 11.25 L 18.75 12.75 L 11.561 12.75 L 13.28 14.47 L 12.22 15.53
                L 8.689 12 L 12.22 8.47 L 13.28 9.53 L 11.561 11.25 Z'
        fill={color}
        style={{
          transformBox: 'fill-box',
          transformOrigin: '50% 50%',
        }}
        transform='matrix(-1, 0, 0, -1, 0.000002, 0.000001)'
      />
    </svg>
  );
};

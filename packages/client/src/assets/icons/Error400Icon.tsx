import React, { FC } from 'react';
import type { IconProps } from '../../types/common';

export const Error400Icon: FC<IconProps> = ({
  className,
  onClick,
  height = '300px',
  width = '100%',
  color,
}) => (
  <svg
    className={className}
    onClick={onClick}
    fill={color || '#525252'}
    width={width}
    height={height}
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    xmlSpace='preserve'
    version='1.1'
    x='0px'
    y='0px'
    viewBox='0 0 100 100'
  >
    <path d='M92.2,2.5H7.8c-2.7,0-4.9,2.2-4.9,4.9V72c0,2.7,2.2,4.9,4.9,4.9h32.5v8.9H36c-5.1,0-9.2,4.1-9.2,9.2v0     c0,1.3,1.1,2.4,2.4,2.4h41.4c1.4,0,2.5-1.1,2.5-2.5c0-5.1-4.1-9.2-9.2-9.2h-4.2v-8.9h32.5c2.7,0,4.9-2.2,4.9-4.9V7.4     C97.1,4.7,94.9,2.5,92.2,2.5z M50,71.7c-1.9,0-3.4-1.5-3.4-3.4c0-1.9,1.5-3.4,3.4-3.4c1.9,0,3.4,1.5,3.4,3.4     C53.4,70.2,51.9,71.7,50,71.7z M87.2,59.8H12.8V12.4h74.4V59.8z' />
    <path d='M33,33.6c0.5,0.5,1.1,0.7,1.7,0.7c0.6,0,1.2-0.2,1.7-0.7l2.8-2.8l2.8,2.8c0.5,0.5,1.1,0.7,1.7,0.7s1.2-0.2,1.7-0.7     c0.9-0.9,0.9-2.4,0-3.3l-2.8-2.8l2.8-2.8c0.9-0.9,0.9-2.4,0-3.3c-0.9-0.9-2.4-0.9-3.3,0l-2.8,2.8l-2.8-2.8     c-0.9-0.9-2.4-0.9-3.3,0c-0.9,0.9-0.9,2.4,0,3.3l2.8,2.8L33,30.3C32.1,31.2,32.1,32.7,33,33.6z' />
    <path d='M54.7,33.6c0.5,0.5,1.1,0.7,1.7,0.7c0.6,0,1.2-0.2,1.7-0.7l2.8-2.8l2.8,2.8c0.5,0.5,1.1,0.7,1.7,0.7     c0.6,0,1.2-0.2,1.7-0.7c0.9-0.9,0.9-2.4,0-3.3l-2.8-2.8l2.8-2.8c0.9-0.9,0.9-2.4,0-3.3c-0.9-0.9-2.4-0.9-3.3,0l-2.8,2.8L58,21.3     c-0.9-0.9-2.4-0.9-3.3,0c-0.9,0.9-0.9,2.4,0,3.3l2.8,2.8l-2.8,2.8C53.8,31.2,53.8,32.7,54.7,33.6z' />
    <path d='M63.5,39h-27c-1.2,0-2.2,1-2.2,2.2c0,1.2,1,2.2,2.2,2.2h13V47c0,3.3,2.7,6.1,6.1,6.1s6.1-2.7,6.1-6.1v-3.5h1.8     c1.2,0,2.2-1,2.2-2.2C65.7,40,64.7,39,63.5,39z M57.2,47c0,0.9-0.7,1.6-1.6,1.6S54,47.9,54,47v-3.5h3.3V47z' />
  </svg>
);

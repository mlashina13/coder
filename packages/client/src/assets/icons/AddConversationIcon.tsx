import React, { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Добавить диалог"
 */
export const AddConversationIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = '#9E9A9A', height = 24, width = 24 } = props;

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
      <path
        style={{ strokeMiterlimit: 10, strokeWidth: '1.91px' }}
        d='M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,
          15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z'
      />
      <path
        style={{ strokeMiterlimit: 10, strokeWidth: '1.91px' }}
        d='M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1'
      />
      <line
        style={{ strokeMiterlimit: 10, strokeWidth: '1.91px' }}
        x1='6.27'
        y1='11.98'
        x2='13.91'
        y2='11.98'
      />
      <line
        style={{ strokeMiterlimit: 10, strokeWidth: '1.91px' }}
        x1='10.09'
        y1='8.16'
        x2='10.09'
        y2='15.8'
      />
    </svg>
  );
};

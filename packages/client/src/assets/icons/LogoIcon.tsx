import React, { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Лого"
 */
export const LogoIcon: FC<IconProps> = (props) => {
  const { onClick, className, height = 32, width = 44 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      viewBox='0 0 47 30'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_6_176)'>
        <path
          d='M4.01989 13.8523V10.0085L16.5483 4.88636V8.99432L8.43466 11.9006L8.5625
                    11.7045V12.1648L8.43466 11.9688L16.5483 14.875V18.983L4.01989 13.8523ZM28.1669
                    0.727272L22.5419 21.625H18.7408L24.3658 0.727272H28.1669ZM42.892 13.8523L30.3636
                    18.983V14.875L38.4688 11.9688L38.3409 12.1648V11.7045L38.4688 11.9006L30.3636
                    8.99432V4.88636L42.892 10.0085V13.8523Z'
          fill='#EF4444'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_6_176'
          x='0.0198975'
          y='0.727295'
          width='46.8721'
          height='28.8977'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_6_176' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_6_176' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

import { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Карандаш"
 */
export const PenIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = '#525252', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      fill='none'
      width={width}
      height={height}
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g id='out' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <path
          d='M2.25,12.9378906 L2.25,15.75 L5.06210943,15.75 L13.3559575,7.45615192 L10.5438481,4.64404249 
                L2.25,12.9378906 L2.25,12.9378906 L2.25,12.9378906 Z M15.5306555,5.28145396 C15.8231148,4.98899458 
                15.8231148,4.5165602 15.5306555,4.22410082 L13.7758992,2.46934454 C13.4834398,2.17688515 
                13.0110054,2.17688515 12.718546,2.46934454 L11.3462366,3.84165394 L14.1583461,6.65376337 
                L15.5306555,5.28145396 L15.5306555,5.28145396 L15.5306555,5.28145396 Z'
          id='path'
          fill={color}
        />
      </g>
    </svg>
  );
};

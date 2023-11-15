import { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Профиль"
 */
export const ProfileIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = '#313131', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      fill={color}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      style={{ padding: 3 }}
    >
      <g id='style=fill'>
        <g id='profile'>
          <path
            id='vector (Stroke)'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M6.75 6.5C6.75 3.6005 9.1005 1.25 12 1.25C14.8995 1.25 17.25 3.6005 
                            17.25 6.5C17.25 9.3995 14.8995 11.75 12 11.75C9.1005 11.75 6.75 9.3995 6.75 6.5Z'
          />
          <path
            id='rec (Stroke)'
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4.25 18.5714C4.25 15.6325 6.63249 13.25 9.57143 13.25H14.4286C17.3675 13.25 19.75 
                            15.6325 19.75 18.5714C19.75 20.8792 17.8792 22.75 15.5714 22.75H8.42857C6.12081 22.75 
                            4.25 20.8792 4.25 18.5714Z'
          />
        </g>
      </g>
    </svg>
  );
};

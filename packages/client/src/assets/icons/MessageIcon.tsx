import { FC } from 'react';
import { IconProps } from '../../types/common';

/**
 * Компонент иконки "Сообщение"
 */
export const MessageIcon: FC<IconProps> = (props) => {
  const { className, onClick, color = '#313131', height = 24, width = 24 } = props;

  return (
    <svg
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      fill={color}
      viewBox='0 0 512 512'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      xmlSpace='preserve'
      style={{ padding: 3 }}
    >
      <g>
        <path
          d='M92.574,294.24V124.336H43.277C19.449,124.336,0,144.213,0,168.467v206.44
		            c0,24.254,19.449,44.133,43.277,44.133h62v45.469c0,3.041,1.824,5.777,4.559,6.932c2.736,
                    1.154,5.957,0.486,8.023-1.641
		            l49.844-50.76h106.494c23.828,0,43.279-19.879,
                    43.279-44.133v-0.061H172.262C128.314,374.846,92.574,338.676,92.574,294.24z'
        />
        <path
          d='M462.717,40H172.26c-27.105,0-49.283,22.59-49.283,50.197v204.037c0,
                    27.61,22.178,50.199,49.283,50.199
		            h164.668l75.348,76.033c2.399,2.442,6.004,3.172,9.135,1.852c3.133-1.322,
                    5.176-4.434,5.176-7.887v-69.998h36.131
		            c27.106,0,49.283-22.59,49.283-50.199V90.197C512,62.59,489.822,40,462.717,
                    40z M369.156,280.115H195.92v-24.316h173.236V280.115z
		            M439.058,204.129H195.92v-24.314h243.138V204.129z M439.058,128.143H195.92v-24.315h243.138V128.143z'
        />
      </g>
    </svg>
  );
};

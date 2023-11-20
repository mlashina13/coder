import React, { FC } from 'react';
import { ImageProps } from './ImageProps';

export const Image: FC<ImageProps> = (props) => {
  const { onClick, src, alt = '', className, height = 32, width = 32 } = props;

  return (
    <img
      alt={alt}
      src={src}
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  );
};

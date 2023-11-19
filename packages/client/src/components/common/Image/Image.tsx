import './ImageStyles.scss';
import React, { FC } from 'react';
import { ImageProps } from './ImageProps';

export const Image: FC<ImageProps> = (props) => {
  const { src, alt, className, height = 32, width = 32 } = props;

  return <img alt={alt} src={src} width={width} height={height} className={className} />;
};

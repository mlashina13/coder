import { gradientOffsetX, gradientOffsetY } from '../../consts';

export const getFieldShadow = (
  x: number,
  y: number,
  lightX: number,
  lightY: number,
  gameChipsFieldWidth: number,
  gameChipsFieldHeight: number
) => {
  const angleRadians = Math.atan2(y - lightY, x - lightX);
  const distanceToLight = Math.sqrt((lightX - x) ** 2 + (lightY - y) ** 2);
  const gradientRadius = distanceToLight / 10;
  const longestSide = Math.max(gameChipsFieldWidth, gameChipsFieldHeight) / gradientRadius;
  const offsetX = Math.cos(angleRadians) * gradientOffsetX;
  const offsetY = Math.sin(angleRadians) * gradientOffsetY;

  return {
    shadowBlur: Math.min(gradientRadius, distanceToLight / (5 * gradientRadius)) * longestSide,
    shadowOffsetX: (offsetX * gameChipsFieldWidth) / (2 * gradientRadius),
    shadowOffsetY: (offsetY * gameChipsFieldHeight) / (2 * gradientRadius),
  };
};

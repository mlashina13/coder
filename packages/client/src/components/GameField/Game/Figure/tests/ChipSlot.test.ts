import { CHIP_COLORS, lightX, lightY } from '../../consts';
import ChipSlot from '../ChipSlot';
import type { BaseFigureProps } from '../types';

describe('ChipSlot', () => {
  const getCanvas = () => document.createElement('canvas');

  const getCtx = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    return context as CanvasRenderingContext2D;
  };

  const getDefaultProps = (): BaseFigureProps => {
    const ctx = getCtx(getCanvas());
    return {
      color: CHIP_COLORS.blue,
      ctx,
      lightX,
      lightY,
      radius: 10,
      x: 1,
      y: 1,
    };
  };

  const getComponent = () => {
    const props = getDefaultProps();
    return new ChipSlot(props);
  };

  test('Должен имплементировать метод draw', () => {
    const testClass = getComponent();
    expect(testClass.draw).toBeDefined();
  });
});

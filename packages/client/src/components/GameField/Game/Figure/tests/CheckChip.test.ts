import { CHIP_COLORS, lightX, lightY } from '../../consts';
import CheckChip from '../CheckChip';
import type { BaseFigureProps } from '../types';

describe('CheckChip', () => {
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
    return new CheckChip(props);
  };

  test('Должен имплементировать метод draw', () => {
    const testClass = getComponent();
    expect(testClass.draw).toBeDefined();
  });

  test('matchColor должен устанавливать значение color как white', () => {
    const testClass = getComponent();
    testClass.matchColor();
    expect(testClass.color).toBe('white');
  });

  test('matchColorAndPosition должен устанавливать значение color как black', () => {
    const testClass = getComponent();
    testClass.matchColorAndPosition();
    expect(testClass.color).toBe('black');
  });
});

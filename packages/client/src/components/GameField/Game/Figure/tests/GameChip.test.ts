import { CHIP_COLORS, lightX, lightY } from '../../consts';
import GameChip from '../GameChip';
import type { BaseFigureProps } from '../types';

describe('Тестирование ф-сти игры: класс GameChip', () => {
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
    return new GameChip(props);
  };

  test('Должен имплементировать метод draw', () => {
    const TestClass = getComponent();
    expect(TestClass.draw).toBeDefined();
  });

  test('isMoving должен быть определен', () => {
    const TestClass = getComponent();
    expect(TestClass.isMoving).toBeDefined();
  });

  test('isMoving должен сопоставлять baseColor и color', () => {
    const TestClass = getComponent();
    TestClass.fill(CHIP_COLORS.red);
    expect(TestClass.isMoving).toBeTruthy();
  });
});

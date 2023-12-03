import { CHIP_COLORS, lightX, lightY } from '../../consts';
import CheckChip from '../CheckChip';
import type { BaseFigureProps } from '../types';

describe('Тестирование ф-сти игры: класс CheckChip', () => {
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
    const TestClass = getComponent();
    expect(TestClass.draw).toBeDefined();
  });

  test('matchColor должен устанавливать значение color как white ', () => {
    const TestClass = getComponent();
    TestClass.matchColor();
    expect(TestClass.color).toBe('white');
  });

  test('matchColorAndPosition должен устанавливать значение color как black ', () => {
    const TestClass = getComponent();
    TestClass.matchColorAndPosition();
    expect(TestClass.color).toBe('black');
  });
});

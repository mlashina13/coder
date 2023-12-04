import { CHIP_COLORS, backgroundColor, lightX, lightY } from '../../consts';
import Figure from '../Figure';
import type { BaseFigureProps, FigureTypes } from '../types';

describe('Figure', () => {
  const getCanvas = () => document.createElement('canvas');

  const getCtx = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    return context as CanvasRenderingContext2D;
  };

  const FIGURE_TYPE: FigureTypes = 'flat';

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

  const gettestClass = (props: BaseFigureProps) => {
    class TestClass extends Figure {
      public draw(ctx: CanvasRenderingContext2D): void {
        this.drawFigure(ctx, FIGURE_TYPE);
      }
    }

    return new TestClass(props);
  };

  test('Реализация должна имплементировать draw', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);
    expect(testClass.draw).toBeDefined();
  });

  test('Метод draw должен вызываться', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);
    const spy = jest.spyOn(testClass, 'draw');
    testClass.draw(defaultProps.ctx);
    expect(spy).toHaveBeenCalled();
  });

  test('Метод fill должен менять значение color', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);
    testClass.fill(CHIP_COLORS.red);
    expect(testClass.color).toBe(CHIP_COLORS.red);
  });

  test('Метод fill должен менять значение color на baseColor при пустых параметрах', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);

    testClass.fill();
    expect(testClass.color).toBe(defaultProps.color);
  });

  test('Метод clear должен менять значение color на backgroundColor', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);

    testClass.clear();
    expect(testClass.color).toBe(backgroundColor);
  });

  describe('Метод isCoordinatesInFigure должен верно определять принадлежность координат', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);
    test('Должен вернуть false', () => {
      const testX = 2;
      const testY = 200;

      expect(testClass.isCoordinatesInFigure(testX, testY)).toBeFalsy();
    });
    test('Должен вернуть true', () => {
      const testX = 2;
      const testY = 2;

      expect(testClass.isCoordinatesInFigure(testX, testY)).toBeTruthy();
    });
  });

  test('Метод setCoordinates должен менять значение координат фигуры', () => {
    const defaultProps = getDefaultProps();
    const testClass = gettestClass(defaultProps);

    const newCoords = {
      x: 50,
      y: 66,
    };

    testClass.setCoordinates(newCoords.x, newCoords.y);
    expect({ x: testClass.x, y: testClass.y }).toEqual(newCoords);
  });
});

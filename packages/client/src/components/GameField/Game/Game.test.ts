/* eslint-disable dot-notation */
import * as GameModule from './Game';
import type { OnEndGameCallback } from './types';

const Game = GameModule.default;

// jest.mock('./Game', () => {
//   const originalModule = jest.requireActual<typeof import('./Game')>('./Game');

//   return {
//     __esModule: true, // Use it when dealing with esModules
//     ...originalModule,
//   };
// });

describe('Проверка ф-ти игры: класс Game', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const getCanvas = () => document.createElement('canvas');

  const getCtx = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    return context as CanvasRenderingContext2D;
  };

  const getCallback = () => jest.fn();

  const getDefaultProps = () => {
    const canvas = getCanvas();
    return {
      canvas,
      ctx: getCtx(canvas),
      colorsCount: 4,
      containerHeight: 700,
      isColorsMayBeRepeated: false,
      stepsCount: 10,
      onGameEnd: getCallback(),
    } as {
      canvas: HTMLCanvasElement;

      ctx: CanvasRenderingContext2D;

      containerHeight: number;

      onGameEnd: OnEndGameCallback | void;

      colorsCount: number;

      stepsCount: number;
      isColorsMayBeRepeated: boolean;
    };
  };

  const getComponent = () => {
    const {
      canvas,
      colorsCount,
      containerHeight,
      ctx,
      isColorsMayBeRepeated,
      onGameEnd,
      stepsCount,
    } = getDefaultProps();
    return new Game(
      canvas,
      ctx,
      containerHeight,
      onGameEnd,
      colorsCount,
      stepsCount,
      isColorsMayBeRepeated
    );
  };

  test('Game destructor вызыввается', () => {
    const game = getComponent();
    const spy = jest.spyOn(game, 'destructor');
    game.destructor();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Game destructor деинициализирует игру', () => {
    const game = getComponent();
    game.destructor();
    expect(Game['_instance']).toBeUndefined();
  });

  test('Два экземпляра класса должны быть идентичны', () => {
    const firstGame = getComponent();
    const secondGame = getComponent();

    expect(firstGame).toEqual(secondGame);
  });

  describe('Начало игры', () => {
    test('Game start должен вызывать destructor', () => {
      const game = getComponent();
      const spy = jest.spyOn(game, 'destructor');
      Game.start();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    // jest.mock('./Game', () => {
    //   const original = jest.requireActual('./Game');
    //   return {
    //     __esModule: true,
    //     // eslint-disable-next-line new-cap
    //     default: jest.fn().mockImplementation(jest.fn()),
    //   };
    // });
    // // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    // const TestGame = require('./Game').default;

    // test('Game start должен пересоздавать instance', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // const actual = jest.requireActual('./Game');
    // const spy = jest.spyOn(actual, 'default');
    // console.log(TestGame);
    // const {
    //   canvas,
    //   colorsCount,
    //   containerHeight,
    //   ctx,
    //   isColorsMayBeRepeated,
    //   onGameEnd,
    //   stepsCount,
    // } = getDefaultProps();
    // // eslint-disable-next-line new-cap
    // const t = new TestGame(
    //   canvas,
    //   ctx,
    //   containerHeight,
    //   onGameEnd,
    //   colorsCount,
    //   stepsCount,
    //   isColorsMayBeRepeated
    // );

    //   jest.mock('./Game');
    //   const spy = jest.spyOn(GameModule, 'default').mockImplementation(jest.fn());

    //   getComponent();
    //   Game.start();

    //   expect(spy).toHaveBeenCalledTimes(1);
    // });
  });

  describe('Окончание игры', () => {
    test('Game setLoss должен вызывать _onGameEnd', () => {
      const game = getComponent();
      // @ts-ignore
      const spy = jest.spyOn(game, '_onGameEnd');
      game['setLoss']();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Game setWinnings должен вызывать _onGameEnd', () => {
      const game = getComponent();
      // @ts-ignore
      const spy = jest.spyOn(game, '_onGameEnd');
      game['setWinnings']();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('Окончание игры должно прерывать анимацию', () => {
      const game = getComponent();
      game['setWinnings']();

      expect(game['_isAnimationStopped']).toBe(true);
    });
  });

  test('При очищении поля должнен вызываться drawChips', () => {
    const game = getComponent();
    // @ts-ignore
    const spy = jest.spyOn(game, 'drawChips');
    game['clear']();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

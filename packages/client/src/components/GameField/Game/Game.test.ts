/* eslint-disable dot-notation */
import { Reference } from 'yup';
import * as GameModule from './Game';
import type { OnEndGameCallback } from './types';

const Game = GameModule.default;

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

    test('Game start при пустом instance должен делать пердупреждение', () => {
      const game = getComponent();
      const spy = jest.spyOn(console, 'warn');
      game.destructor();
      Game.start();

      expect(spy).toHaveBeenCalled();
    });

    test('Game start должен пересоздавать instance', () => {
      const {
        canvas,
        colorsCount,
        containerHeight,
        ctx,
        isColorsMayBeRepeated,
        onGameEnd,
        stepsCount,
      } = getDefaultProps();
      const firstGame = new Game(
        canvas,
        ctx,
        containerHeight,
        onGameEnd,
        colorsCount,
        stepsCount,
        isColorsMayBeRepeated
      );

      Game.start();

      expect(Game['_instance']).not.toEqual(firstGame);
    });
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

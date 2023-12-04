/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import Field from './Field';
import { FieldProps } from './FieldProps';
import { lightX, lightY } from '../consts';

describe('Field', () => {
  beforeAll(() => {
    setupJestCanvasMock();
  });

  const getCanvas = () => document.createElement('canvas');

  const getCtx = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    return context as CanvasRenderingContext2D;
  };

  describe('Создание класса', () => {
    const getDefaultProps = () => {
      const canvas = getCanvas();
      const ctx = getCtx(canvas);

      return {
        canvas,
        ctx,
        chipSize: 21.5,
        colorsInRowCount: 4,
        defaultLightX: lightX,
        defaultLightY: lightY,
        maxStepsCount: 1,
      };
    };

    const getDefaultfieldClass = () => {
      const {
        canvas,
        chipSize,
        colorsInRowCount,
        ctx,
        defaultLightX,
        defaultLightY,
        maxStepsCount,
      } = getDefaultProps();
      return new Field(
        canvas,
        ctx,
        chipSize,
        colorsInRowCount,
        maxStepsCount,
        defaultLightX,
        defaultLightY
      );
    };
    test('Должен создавать идентичные классы при одинаковом наборе параметров', () => {
      const firstField = getDefaultfieldClass();
      const secondField = getDefaultfieldClass();

      expect(firstField).toEqual(secondField);
    });

    describe('Геттеры', () => {
      test('canvas не должен быть null', () => {
        const fieldClass = getDefaultfieldClass();
        expect(fieldClass.canvas).not.toBeNull();
      });
      test('ctx не должен быть null', () => {
        const fieldClass = getDefaultfieldClass();
        expect(fieldClass.ctx).not.toBeNull();
      });
      test('gameChipsFieldWidth не должен быть null', () => {
        const fieldClass = getDefaultfieldClass();
        expect(fieldClass.gameChipsFieldWidth).not.toBeNull();
      });
      test('gameChipsFieldWidth должен высчитыватся по формуле', () => {
        const fieldClass = getDefaultfieldClass();
        const { chipSize, colorsInRowCount } = getDefaultProps();
        const checkChipsFieldWidthips = chipSize * (Math.ceil(colorsInRowCount / 2) + 1);
        const chipSlotsFieldWidth = 1.5 * chipSize * (colorsInRowCount + 1);
        const defaultGameChipsFieldWidth = checkChipsFieldWidthips + chipSlotsFieldWidth;
        expect(fieldClass.gameChipsFieldWidth).toEqual(defaultGameChipsFieldWidth);
      });
    });

    test('Метод draw должен отрисовывать поле', () => {
      const fieldClass = getDefaultfieldClass();

      expect(fieldClass.ctx.__getPath()).toMatchSnapshot();
    });
  });
});

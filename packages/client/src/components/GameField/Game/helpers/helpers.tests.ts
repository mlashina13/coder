import { generateRandomColorSequence } from '.';
import type { Reference } from '../types';

describe('Проверка ф-ти движка игры: вспомогательные ф-ции', () => {
  describe('generateRandomColorSequence', () => {
    test('Должна составляться корректная последовательность', () => {
      const colorCount = 4;
      const expectedColorsCount = 5;
      const isColorsMayBeRepeated = false;
      const sequence = generateRandomColorSequence(colorCount, isColorsMayBeRepeated);

      expect(sequence.length).toBe(expectedColorsCount);
    });

    test('При заданном параметре isColorsMayBeRepeated=false цвета не должны повторяться', () => {
      const colorCount = 4;
      const expectedColorsCount = 5;
      const isColorsMayBeRepeated = false;
      const sequence = generateRandomColorSequence(colorCount, isColorsMayBeRepeated);

      const isArrayUnique = (array: Reference) =>
        Array.isArray(array) && new Set(array).size === array.length;

      expect(isArrayUnique(sequence)).toBeTruthy();
    });
  });
});

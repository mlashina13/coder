import GameImage from './GameImage';

describe('Проверка ф-ти игры: класс GameImage', () => {
  const getDefaultProps = () =>
    ({
      availableColorsCount: 5,
      chipSize: 91.375,
      endX: 959.4375,
      startX: 868.0625,
      y: 456.875,
    } as {
      startX: number;
      endX: number;
      y: number;
      chipSize: number;
      availableColorsCount: number;
    });

  const getComponent = () => {
    const { availableColorsCount, chipSize, endX, startX, y } = getDefaultProps();
    const gameImage = new GameImage(startX, endX, y, chipSize, availableColorsCount);

    /**
     * workaround:
     * isActive undefined при вызове у экземляра класса, создать через мок не выходит,
     * https://github.com/jestjs/jest/issues/9675
     * */
    Object.defineProperty(gameImage, 'isActive', {
      get() {
        // @ts-ignore
        return gameImage._isActive;
      },
    });

    return gameImage;
  };

  test('Метод draw должен быть определен', () => {
    const gameImage = getComponent();
    expect(gameImage.draw).toBeDefined();
  });

  describe('Управление состоянием и отображением', () => {
    const ACTIVE_IMAGE_SRC = '/src/assets/img/red-lock-512.png';
    const INACTIVE_IMAGE_SRC = '/src/assets/img/lock-512.png';

    test('activate должен устанавливать isActive = true', () => {
      const gameImage = getComponent();
      gameImage.activate();
      expect(gameImage.isActive).toBe(true);
    });

    test('activate должен устанавливать imageSrc = /src/assets/img/red-lock-512.png', () => {
      const gameImage = getComponent();
      gameImage.activate();
      expect(gameImage.src).toMatch(ACTIVE_IMAGE_SRC);
    });

    test('deactivate должен устанавливать isActive = false', () => {
      const gameImage = getComponent();
      gameImage.deactivate();
      expect(gameImage.isActive).toBe(false);
    });

    test('deactivate должен устанавливать imageSrc = /src/assets/img/lock-512.png', () => {
      const gameImage = getComponent();
      gameImage.deactivate();
      expect(gameImage.src).toMatch(INACTIVE_IMAGE_SRC);
    });
  });

  describe('Корректное вычисление координат isCoordinatesInImage', () => {
    test('Должен вернуть true', () => {
      const gameImage = getComponent();
      gameImage.activate();
      const isInImage = gameImage.isCoordinatesInImage(900, 500);
      expect(isInImage).toBe(true);
    });
    test('Должен вернуть false', () => {
      const gameImage = getComponent();
      gameImage.activate();
      const isInImage = gameImage.isCoordinatesInImage(200, 100);
      expect(isInImage).toBe(false);
    });
  });
});

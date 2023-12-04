import Mouse from './Mouse';

describe('Проверка ф-ти игры: класс Mouse', () => {
  const getComponent = () => new Mouse();

  test('Два экземпляра класса должны быть идентичны', () => {
    const firstMouse = getComponent();
    const secondMouse = getComponent();

    expect(firstMouse).toEqual(secondMouse);
  });

  test('Координаты должны устанавливаться вызовом метода setCoordinates', () => {
    const mouse = getComponent();
    const expectedValues = {
      x: 10,
      y: 10,
    };
    mouse.setCoordinates(expectedValues.x, expectedValues.y);
    expect({ x: mouse.x, y: mouse.y }).toEqual(expectedValues);
  });

  test('Начальные координаты должны устанавливаться вызовом метода setStartCoordinates', () => {
    const mouse = getComponent();
    const expectedValues = {
      x: 10,
      y: 10,
    };
    mouse.setStartCoordinates();
    expect({ x: mouse.startX, y: mouse.startY }).toEqual(expectedValues);
  });

  describe('clearStartCoordinates должен очищать начальные координаты', () => {
    test('clearStartCoordinates должен очищать startX', () => {
      const mouse = getComponent();
      mouse.clearStartCoordinates();
      expect(mouse.startX).toBeUndefined();
    });
    test('clearStartCoordinates должен очищать startY', () => {
      const mouse = getComponent();
      mouse.clearStartCoordinates();
      expect(mouse.startY).toBeUndefined();
    });
  });
});

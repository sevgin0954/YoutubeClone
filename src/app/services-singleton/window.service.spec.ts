import { WindowService } from './window.service';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

let service: WindowService;

beforeEach(() => {
  service = new WindowService();
});

describe('WindowService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('WindowService\s isElementOverflowing method', () => {

  const screenWidth = 800;
  const screenHeight = 800;

  beforeEach(() => {
    spyOnProperty(window.screen, 'width').and.returnValue(screenWidth);
    spyOnProperty(window.screen, 'height').and.returnValue(screenHeight);
  });

  it('with null element should throw an exception', () => {
    // Arrange
    const element = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => service.isElementOverflowing(element)).toThrowError(exceptionRegex);
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with not overflowing element at the bottom right edge should return false', () => {
      // Arrange
      const element = document.createElement('div');
      const elementX = screenWidth - elementSize;
      const elementY = screenHeight - elementSize;
      setupElementGetBoundingClientRectStub(element, elementX, elementY, elementSize);

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeFalsy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with not overflowing element at the bottom left edge should return false', () => {
      // Arrange
      const element = document.createElement('div');
      const elementX = 0;
      const elementY = screenHeight - elementSize;
      setupElementGetBoundingClientRectStub(element, elementX, elementY, elementSize);

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeFalsy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with not overflowing element at the top left edge should return false', () => {
      // Arrange
      const element = document.createElement('div');
      const elementX = 0;
      const elementY = 0;
      setupElementGetBoundingClientRectStub(element, elementX, elementY, elementSize);

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeFalsy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with not overflowing element at the top right edge should return false', () => {
      // Arrange
      const element = document.createElement('div');
      const elementX = screenWidth - elementSize;
      const elementY = 0;
      setupElementGetBoundingClientRectStub(element, elementX, elementY, elementSize);

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeFalsy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with element overflowing from right should return true', () => {
      // Arrange
      const element = document.createElement('div');
      const elementStartPointX = screenWidth - elementSize;
      const elementStartPointY = 0;
      setupElementGetBoundingClientRectStub(
        element,
        elementStartPointX + 1,
        elementStartPointY,
        elementSize
      );

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeTruthy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with element overflowing from botton should return true', () => {
      // Arrange
      const element = document.createElement('div');
      const elementStartPointX = 0;
      const elementStartPointY = screenHeight - elementSize;
      setupElementGetBoundingClientRectStub(
        element,
        elementStartPointX,
        elementStartPointY + 1,
        elementSize
      );

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeTruthy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with element overflowing from left should return true', () => {
      // Arrange
      const element = document.createElement('div');
      const elementStartPointX = 0;
      const elementStartPointY = 0;
      setupElementGetBoundingClientRectStub(
        element,
        elementStartPointX - 1,
        elementStartPointY,
        elementSize
      );

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeTruthy();
    });
  });

  [
    0,
    10
  ].forEach(elementSize => {
    it('with element overflowing from top should return true', () => {
      // Arrange
      const element = document.createElement('div');
      const elementStartPointX = 0;
      const elementStartPointY = 0;
      setupElementGetBoundingClientRectStub(
        element,
        elementStartPointX ,
        elementStartPointY - 1,
        elementSize
      );

      // Act
      const result = service.isElementOverflowing(element);

      // Assert
      expect(result).toBeTruthy();
    });
  });

  function setupElementGetBoundingClientRectStub(
    element: Element,
    elementXStartPosition: number,
    elementYStartPosition: number,
    elementSize: number
  ): void {

    const newRect = new DOMRect(elementXStartPosition, elementYStartPosition, elementSize, elementSize);
    spyOn(element, 'getBoundingClientRect').and.returnValue(newRect);
  }
});

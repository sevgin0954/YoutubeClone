import { FormatterService } from './formatter.service';
import { MainConstants } from '../shared/Constants/main-constants';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

let service: any;

beforeEach(() => service = new FormatterService());

describe('FormatterService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('FormatterService\'s getFormattedNumberString method', () => {

  it('with null number should return hidden', () => {
    // Arrange
    const number = null;

    // Act
    const result = service.getFormattedNumberString(number);

    // Assert
    expect(result).toEqual(MainConstants.HIDDEN);
  });

  it('with undefinied number should return hidden', () => {
    // Arrange
    const number = undefined;

    // Act
    const result = service.getFormattedNumberString(number);

    // Assert
    expect(result).toEqual(MainConstants.HIDDEN);
  });

  it('with negative number should throw an exception', () => {
    // Arrange
    const number = -1;
    const exceptionRegex = new RegExp(ExceptionConstants.NEGATIVE_NUMBER);

    // Act

    // Assert
    expect(() => service.getFormattedNumberString(number)).toThrowError(exceptionRegex);
  });

  it('with number with more than twelve digits should throw an exception', () => {
    // Arrange
    const number = 1000000000000;
    const exceptionRegex = new RegExp(ExceptionConstants.NOT_SUPPORTED);

    // Act

    // Assert
    expect(() => service.getFormattedNumberString(number)).toThrowError(exceptionRegex);
  });

  [
    [0, '0'],
    [9, '9'],
    [19, '19'],
    [999, '999']
  ].forEach(data => {
    it('with number with three or less digits number should return the number as string', () => {
      // Arrange
      const number = data[0];
      const expectedResult = data[1];

      // Act
      const actualResult = service.getFormattedNumberString(number);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

  [
    [1000, '1K'],
    [1001, '1K'],
    [1010, '1K'],
    [1100, '1,1K'],
    [100000, '100K'],
    [101000, '101K']
  ].forEach(data => {
    it('with number between four and six digits should return rounded digit to the socond sign with appended K at the end', () => {
      // Arrange
      const number = data[0];
      const expectedResult = data[1];

      // Act
      const actualResult = service.getFormattedNumberString(number);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

  [
    [1000000, '1M'],
    [1000001, '1M'],
    [1000010, '1M'],
    [1000100, '1M'],
    [1001000, '1M'],
    [1010000, '1M'],
    [1100000, '1,1M'],
    [10000000, '10M'],
    [11000000, '11M'],
    [10100000, '10,1M']
  ].forEach(data => {
    it('with number between seven to nine digits should return rounded digit to the socond sign with appended M at the end', () => {
      // Arrange
      const number = data[0];
      const expectedResult = data[1];

      // Act
      const actualResult = service.getFormattedNumberString(number);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

  [
    [1000000000, '1B'],
    [1000000010, '1B'],
    [1000000100, '1B'],
    [1000001000, '1B'],
    [1000010000, '1B'],
    [1000100000, '1B'],
    [1100000000, '1,1B'],
    [10000000000, '10B'],
    [10100000000, '10,1B'],
    [101000000000, '101B'],
    [100100000000, '100,1B']
  ].forEach(data => {
    it('with number between ten to twelve digits should return rounded digit to the socond sign with appended B at the end', () => {
      // Arrange
      const number = data[0];
      const expectedResult = data[1];

      // Act
      const actualResult = service.getFormattedNumberString(number);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

});

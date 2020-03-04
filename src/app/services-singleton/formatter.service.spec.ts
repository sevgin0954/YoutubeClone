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

describe('FormatterService\'s getConcisedNumberString method', () => {

  it('with null number should throw an exception', () => {
    // Arrange
    const number = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithNumber(number)).toThrowError(exceptionRegex);
  });

  it('with undefined integerPartLength should throw an exception', () => {
    // Arrange
    const number = undefined;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithNumber(number)).toThrowError(exceptionRegex);
  });

  it('with negative integerPartLength should throw an exception', () => {
    // Arrange
    const number = '1';
    const integralPart = -1;
    const exceptionRegex = new RegExp(ExceptionConstants.NEGATIVE_NUMBER);

    // Act

    // Assert
    expect(() => service.getConcisedNumberString(number, integralPart)).toThrowError(exceptionRegex);
  });

  it('with integerPartLength bigger than the number should throw an exception', () => {
    // Arrange
    const number = '1';
    const integralPart = 2;
    const exceptionRegex = new RegExp(ExceptionConstants.EXCEEDED_MAX_VALUE);

    // Act

    // Assert
    expect(() => service.getConcisedNumberString(number, integralPart)).toThrowError(exceptionRegex);
  });

  [
    ['1111', 1, '1,1'],
    ['1111', 2, '11,1'],
    ['1111', 3, '111,1'],
  ].forEach(data => {
    it('with number and integral part should take the integral part, append comma and append only the next number after', () => {
      // Arrange
      const number = data[0];
      const integerPartLength = data[1];
      const expectedResult = data[2];

      // Act
      const actualResult = service.getConcisedNumberString(number, integerPartLength);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

  [
    ['1', 1, '1'],
    ['10', 2, '10'],
  ].forEach(data => {
    it('with equal number and integral part should return the same number', () => {
      // Arrange
      const number = data[0];
      const integerPartLength = data[1];
      const expectedResult = data[2];

      // Act
      const actualResult = service.getConcisedNumberString(number, integerPartLength);

      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });

  it('with equal number and integral part should return the same number', () => {
    // Arrange
    const number = '101';
    const integerPartLength = 1;
    const expectedResult = '1';

    // Act
    const actualResult = service.getConcisedNumberString(number, integerPartLength);

    // Assert
    expect(actualResult).toEqual(expectedResult);
  });

  function callMethodWithNumber(number: string): string {
    const integerPartLength = 1;
    const result = service.getConcisedNumberString(number, integerPartLength);

    return result;
  }
});

import { ElementsPredicateService } from './elements-predicate.service';
import { ExceptionConstants } from '../shared/Constants/exception-constants';
import { ElementUtilities } from 'src/tests-common/utilities/element-utilities';

let service: any;

beforeEach(() => service = new ElementsPredicateService());

describe('ElementsPredicateService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ElementsPredicateService\'s getFirstHiddenElementFromRight method', () => {

  it('with null element should throw an exception', () => {
    // Arrange
    const currentElement = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithCurrentElement(currentElement)).toThrowError(exceptionRegex);
  });

  it('with negative index should throw exception', () => {
    // Arrange
    const index = -1;
    const exceptionRegex = new RegExp(ExceptionConstants.INDEX_OUT_OF_RANGE);

    // Act

    // Assert
    expect(() => callMethodWithIndex(index)).toThrowError(exceptionRegex);
  });

  it('with index out of range should throw an exception', () => {
    // Arrange
    const elements = [
      ElementUtilities.createHiddenElement()
    ];
    const index = 5;
    const exceptionRegex = new RegExp(ExceptionConstants.INDEX_OUT_OF_RANGE);

    // Act

    // Assert
    expect(() => callMethodWithIndexAndElements(index, elements)).toThrowError(exceptionRegex);
  });

  it('with null elements should throw an exception', () => {
    // Arrange
    const elements = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with emty elements should throw an exception', () => {
    // Arrange
    const elements = [];
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with previous and current hidden element should return false', () => {
    // Arrange
    const elements = [
      ElementUtilities.createHiddenElement(),
      ElementUtilities.createHiddenElement()
    ];
    const currentElementIndex = 1;
    // Act
    const result = callMethodWithIndexAndElements(currentElementIndex, elements);

    // Assert
    expect(result).toBeFalsy();
  });

  it('with previous shown element element and current hidden element should return true', () => {
    // Arrange
    const elements = [
      document.createElement('div'),
      ElementUtilities.createHiddenElement()
    ];
    const currentElementIndex = 1;

    // Act
    const result = callMethodWithIndexAndElements(currentElementIndex, elements);

    // Assert
    expect(result).toBeTruthy();
  });

  it('with only hidden elements should return false', () => {
    // Arrange
    const elements = [
      ElementUtilities.createHiddenElement()
    ];
    const currentElementIndex = 0;

    // Act
    const result = callMethodWithIndexAndElements(currentElementIndex, elements);

    // Assert
    expect(result).toBeFalsy();
  });

  it('with current shown element and previous hidden element should return false', () => {
    // Arrange
    const elements = [
      ElementUtilities.createHiddenElement(),
      document.createElement('div')
    ];
    const currentElementIndex = 1;

    // Act
    const result = callMethodWithIndexAndElements(currentElementIndex, elements);

    // Assert
    expect(result).toBeFalsy();
  });

  function callMethodWithCurrentElement(currentElement: Element): boolean {
    const index = 0;
    const elements = [
      ElementUtilities.createHiddenElement()
    ];
    const result = service.getFirstHiddenElementFromRight(currentElement, index, elements);

    return result;
  }

  function callMethodWithElements(elements: Element[]): boolean {
    const index = 0;
    const result = callMethodWithIndexAndElements(index, elements);

    return result;
  }

  function callMethodWithIndex(index: number): boolean {
    const currentElement = ElementUtilities.createHiddenElement();
    const elements = [
      ElementUtilities.createHiddenElement()
    ];
    const result = service.getFirstHiddenElementFromRight(currentElement, index, elements);

    return result;
  }

  function callMethodWithIndexAndElements(index: number, elements: Element[]): boolean {
    const currentElement = ElementUtilities.createHiddenElement();
    const result = service.getFirstHiddenElementFromRight(currentElement, index, elements);

    return result;
  }
});

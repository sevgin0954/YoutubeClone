import { ElementDisplayService } from "./elements-display.service";
import { ExceptionConstants } from '../shared/Constants/exception-constants';

let service: ElementDisplayService;
let elementsPredicateService: any;
let windowService: any;

beforeEach(() => {
  elementsPredicateService = jasmine.createSpyObj(
    'ElementsPredicateService',
    ['getFirstHiddenElementFromRight', 'getLastHiddenElementFromLeft', 'getLastShownElement']
  );
});
beforeEach(() => {
  windowService = jasmine.createSpyObj(
    'WindowService',
    ['isElementOverflowing']
  );
});
beforeEach(() => {
  service = new ElementDisplayService(elementsPredicateService, windowService);
});

describe('ElementsDisplayService', () => {
  it('should be created', () => {
    // Act
    expect(service).toBeTruthy();
  });
});

describe('ElementsDisplayService\'s showFirstHiddenElementFromRight method', () => {

  it('with null elements should throw an exception', () => {
    // Arrange
    const elements = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with empty elements should throw an exception', () => {
    // Arrange
    const elements = [];
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('without hidden elements from the right side should throw an exception', () => {
    // Arrange
    const elements = [
      document.createElement('div')
    ];

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(ExceptionConstants.NOT_FOUND);
  });

  it('with elements should show first hidden element from the right side', () => {
    // Arrange
    const shownElement = document.createElement('div');
    const firstHiddenElement = createHiddenElement();
    const secondHiddenElement = createHiddenElement();

    setupPredicateStub(elementsPredicateService.getFirstHiddenElementFromRight, firstHiddenElement);

    const elements = [
      shownElement,
      firstHiddenElement,
      secondHiddenElement,
    ];

    // Act
    callMethodWithElements(elements);

    // Assert
    expect(firstHiddenElement.hasAttribute('hidden')).toBeFalsy();
  });

  function callMethodWithElements(elements: Element[]): void {
    service.showFirstHiddenElementFromRight(elements);
  }
});

describe('ElementsDisplayService\'s hideFirstShownElement method', () => {
  it('with null elements should throw an exception', () => {
    // Arrange
    const elements = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with empty elements should throw an exception', () => {
    // Arrange
    const elements = [];
    const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('without shown elements should throw an exception', () => {
    // Arrange
    const hiddenElement = createHiddenElement();
    const elements = [hiddenElement];

    const exceptionRegex = new RegExp(ExceptionConstants.NOT_FOUND);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with elements should hide first show element from the left side', () => {
    // Arrange
    const firstShownElement = document.createElement('div');
    const secondShownElement = document.createElement('div');
    const hiddenElement = createHiddenElement();
    const elements = [firstShownElement, secondShownElement, hiddenElement];

    // Act
    callMethodWithElements(elements);

    // Assert
    expect(firstShownElement.hasAttribute('hidden')).toBeTruthy();
  });

  function callMethodWithElements(elements: Element[]): void {
    service.hideFirstShownElement(elements);
  }
});

describe('ElementsDisplayService\'s hideLastShowElement method', () => {

  it('with null elements should throw an exception', () => {
    // Arrange
    const elements = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with undefined elements should throw an exception', () => {
    // Arrange
    const elements = undefined;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('without shown elements should throw an exception', () => {
    // Arrange
    const hiddenElement = createHiddenElement();
    const elements = [hiddenElement];

    const exceptionRegex = new RegExp(ExceptionConstants.NOT_FOUND);

    // Act

    // Assert
    expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
  });

  it('with elements should hide the last shown elements', () => {
    // Arrange
    const hiddenElement = createHiddenElement();
    const firstShownElement = document.createElement('div');
    const secondShownElement = document.createElement('div');
    const elements = [hiddenElement, firstShownElement, secondShownElement];

    setupPredicateStub(elementsPredicateService.getLastShownElement, secondShownElement);

    // Act
    callMethodWithElements(elements);

    // Assert
    expect(secondShownElement.hasAttribute('hidden')).toBeTruthy();
  });

  function callMethodWithElements(elements: Element[]): void {
    service.hideLastShowElement(elements);
  }
});

describe('ElementsDisplayService\'s tryShowElementIfNotOverflowing', () => {

  it('with null elementToShow should throw an exception', () => {
    // Arrange
    const elementToShow = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElementToShow(elementToShow)).toThrowError(exceptionRegex);
  });

  it('with undefined lastShownElement should throw an exception', () => {
    // Arrange
    const elementToShow = undefined;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithElementToShow(elementToShow)).toThrowError(exceptionRegex);
  });

  it('with overflowing lastShownElement should not show element', () => {
    // Arrange
    const elementToShow = createHiddenElement();
    const lastShownElement = document.createElement('div');

    const isLastElementOverflowing = true;
    setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

    // Act
    callMethodWithElementToShow(elementToShow);

    // Assert
    expect(elementToShow.hasAttribute('hidden')).toBeTruthy();
  });

  it('with not overflowing lastShownElement should show element', () => {
    // Arrange
    const elementToShow = createHiddenElement();
    const lastShownElement = document.createElement('div');

    const isLastElementOverflowing = false;
    setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

    // Act
    callMethodWithElementToShow(elementToShow);

    // Assert
    expect(elementToShow.hasAttribute('hidden')).toBeFalsy();
  });

  it('with not overflowing lastShownElement should return true', () => {
    // Arrange

    // Act
    const isLastElementOverflowing = false;
    var result = callMethodWithDefaultArguments(isLastElementOverflowing);

    // Assert
    expect(result).toBeTruthy();
  });

  it('with overflowing lastShownElement should return false', () => {
    // Arrange

    // Act
    const isLastElementOverflowing = true;
    var result = callMethodWithDefaultArguments(isLastElementOverflowing);

    // Assert
    expect(result).toBeFalsy();
  });

  it('with already shown elementToShow should throw an exception', () => {
    // Arrange
    const elementToShow = document.createElement('div');
    const exceptionRegex = new RegExp(ExceptionConstants.MISSING_ATTRIBUTE);

    // Act

    // Assert
    expect(() => callMethodWithElementToShow(elementToShow)).toThrowError(exceptionRegex);
  });

  it('with hidden lastShownElement should throw an exception', () => {
    // Arrange
    const lastShownElement = createHiddenElement();
    const exceptionRegex = new RegExp(ExceptionConstants.HAVING_ATTRIBUTE);

    // Act

    // Assert
    expect(() => callMethodWithLastShownElement(lastShownElement)).toThrowError(exceptionRegex);
  });

  function callMethodWithDefaultArguments(isLastElementOverflowing: boolean): boolean {
    const elementToShow = createHiddenElement();
    const lastShownElement = document.createElement('div');

    setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

    const result = callMethodWithElementToShow(elementToShow);

    return result;
  }

  function callMethodWithElementToShow(elementToShow: Element): boolean {
    const lastShownElement = document.createElement('div');
    const result = service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

    return result;
  }

  function callMethodWithLastShownElement(lastShownElement: Element): boolean {
    const elementToShow = createHiddenElement();
    const result = service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

    return result;
  }
});

function createHiddenElement(): Element {
  const hiddenElement = document.createElement('div');
  hiddenElement.setAttribute('hidden', 'hidden');

  return hiddenElement;
}

function setupPredicateStub(predicateFunc: any, elementToMatch: any): void {
  predicateFunc.and.callFake((element) => {
    let result = false;

    if (element === elementToMatch) {
      result = true;
    }

    return result;
  });
}

function setupWindowIsOverflowingFunc(windowService, element: Element, returnResult: boolean): void {
  windowService.isElementOverflowing.and.callFake(() => {
    if (element === element) {
      return returnResult;
    }
  });
}

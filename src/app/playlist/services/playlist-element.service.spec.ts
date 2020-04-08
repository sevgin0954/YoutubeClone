import { ElementUtilities } from 'src/tests-common/utilities/element-utilities';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { SetupStubs } from 'src/tests-common/utilities/setup-stubs-utilities';
import { PlaylistElementService } from './playlist-element.service';

describe('', () => {
  let service: any;
  let elementDisplayService: any;
  let elementsPredicateService: any;
  let windowService: any;

  beforeEach(() => {
    elementDisplayService = jasmine.createSpyObj(
      'ElementDisplayService',
      [
        'isElementOverflowingHorizontaly',
        'tryShowElementIfNotOverflowing'
      ]
    );
  });
  beforeEach(() => {
    elementsPredicateService = jasmine.createSpyObj(
      'ElementsPredicateService',
      [
        'getFirstHiddenElementFromRight',
        'getLastHiddenElementFromLeft',
        'getLastShownElement'
      ]
    );
  });
  beforeEach(() => {
    windowService = jasmine.createSpyObj(
      'WindowService',
      ['isElementOverflowingHorizontaly']
    );
  });
  beforeEach(() => {
    service = new PlaylistElementService(
      elementDisplayService,
      elementsPredicateService,
      windowService
    );
  });

  describe('PlaylistElementService\'s showFirstHiddenElementFromRight method', () => {

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
      const firstHiddenElement = ElementUtilities.createHiddenElement();
      const secondHiddenElement = ElementUtilities.createHiddenElement();

      SetupStubs.setupPredicateStub(
        elementsPredicateService.getFirstHiddenElementFromRight,
        firstHiddenElement
      );

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

  describe('PlaylistElementService\'s hideFirstShownElement method', () => {
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
      const hiddenElement = ElementUtilities.createHiddenElement();
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
      const hiddenElement = ElementUtilities.createHiddenElement();
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

  describe('PlaylistElementService\'s hideLastShowElement method', () => {

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
      const hiddenElement = ElementUtilities.createHiddenElement();
      const elements = [hiddenElement];

      const exceptionRegex = new RegExp(ExceptionConstants.NOT_FOUND);

      // Act

      // Assert
      expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
    });

    it('with elements should hide the last shown elements', () => {
      // Arrange
      const hiddenElement = ElementUtilities.createHiddenElement();
      const firstShownElement = document.createElement('div');
      const secondShownElement = document.createElement('div');
      const elements = [hiddenElement, firstShownElement, secondShownElement];

      SetupStubs
        .setupPredicateStub(elementsPredicateService.getLastShownElement, secondShownElement);

      // Act
      callMethodWithElements(elements);

      // Assert
      expect(secondShownElement.hasAttribute('hidden')).toBeTruthy();
    });

    function callMethodWithElements(elements: Element[]): void {
      service.hideLastShowElement(elements);
    }
  });

  describe('PlaylistElementService\'s tryHideRightOverflowingElements', () => {

    beforeEach(() => {
      spyOn(service, 'hideLastShowElement');
    });

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

    it('with null lastShownElement should throw an exception', () => {
      // Arrange
      const lastShownElement = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithElements(lastShownElement)).toThrowError(exceptionRegex);
    });

    it('with hidden lastShownElement should throw an exception', () => {
      // Arrange
      const lastShownElement = ElementUtilities.createHiddenElement();
      const exceptionRegex = new RegExp(ExceptionConstants.HAVING_ATTRIBUTE);

      // Act

      // Assert
      expect(() => callMethodWithLastShownElement(lastShownElement)).toThrowError(exceptionRegex);
    });

    it('with not overflowing lastShownElement should not hide elements', () => {

      // Arrange
      const lastShowElement = document.createElement('div');

      const isLastElementOverflowing = false;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShowElement, isLastElementOverflowing);

      // Act
      callMethodWithLastShownElement(lastShowElement);

      // Assert
      expect(service.hideLastShowElement).toHaveBeenCalledTimes(0);
    });

    it('with overflowing lastShownElement and not hidden element should hide shown element from the right side until lastShownElement is not overflowing', () => {

      // Arrange
      const lastShowElement = document.createElement('div');

      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = document.createElement('div');
      const elements = [firstElement, secondElement];

      windowService.isElementOverflowingHorizontaly.and.returnValues(true, false);

      // Act
      service.tryHideRightOverflowingElements(elements, lastShowElement);

      // Assert
      expect(service.hideLastShowElement).toHaveBeenCalledTimes(1);
    });

    it('with overflowing lastShownElement and not hidden element should hide shown element from the right side until there is no more shown elements from the right side', () => {

      // Arrange
      spyOn(service, 'isThereShownElement');

      const lastShowElement = document.createElement('div');

      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = document.createElement('div');
      const elements = [firstElement, secondElement];

      windowService.isElementOverflowingHorizontaly.and.returnValue(true);
      service.isThereShownElement.and.returnValues(true, false);

      // Act
      service.tryHideRightOverflowingElements(elements, lastShowElement);

      // Assert
      expect(service.hideLastShowElement).toHaveBeenCalledWith(elements);
      expect(service.hideLastShowElement).toHaveBeenCalledTimes(1);
    });

    it('with not overflowing lastShownElement should return false', () => {
      // Arrange

      // Act
      const isLastElementOverflowing = false;
      const result = callMethodWithIsLastElementOverflowing(isLastElementOverflowing);

      // Assert
      expect(result).toBeFalsy();
    });

    it('with not shown element and overflowing element should return false', () => {
      // Arrange
      const hiddenElement = ElementUtilities.createHiddenElement();
      const elements = [hiddenElement];

      const lastShowElement = document.createElement('div');

      const isElementOverflowing = true;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShowElement, isElementOverflowing);

      // Act
      const result = service.tryHideRightOverflowingElements(elements, lastShowElement);

      // Assert
      expect(result).toBeFalsy();
    });

    it('with overflowing lastShownElement and shown element should return true', () => {
      // Arrange
      windowService.isElementOverflowingHorizontaly.and.returnValues(true, false);

      // Act
      const result = callMethodWithDefaultArguments();

      // Assert
      expect(result).toBeTruthy();
    });

    function callMethodWithIsLastElementOverflowing(isLastElementOverflowing: boolean): boolean {
      const lastShownElement = document.createElement('div');

      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShownElement, isLastElementOverflowing);

      const result = callMethodWithLastShownElement(lastShownElement);

      return result;
    }

    function callMethodWithDefaultArguments(): boolean {
      const lastShownElement = document.createElement('div');
      const result = callMethodWithLastShownElement(lastShownElement);

      return result;
    }

    function callMethodWithLastShownElement(lastShownElement: Element): boolean {
      const elements = ElementUtilities.getShownElements();

      const result = service.tryHideRightOverflowingElements(elements, lastShownElement);

      return result;
    }

    function callMethodWithElements(elements: Element[]): boolean {
      const lastShownElement = document.createElement('div');
      const result = service.tryHideRightOverflowingElements(elements, lastShownElement);

      return result;
    }
  });

  describe('PlaylistElementService\'s tryShowLastHiddenElementsFromLeftUntilOverflow', () => {

    it(`with null elements should throw an exception`, () => {
      // Arrange
      const elements = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
    });

    it(`with empty elements should throw an exception`, () => {
      // Arrange
      const elements = [];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

      // Act

      // Assert
      expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
    });

    it(`with null lastShownElement should throw an exception`, () => {
      // Arrange
      const lastShowElement = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithLastShownElement(lastShowElement)).toThrowError(exceptionRegex);
    });

    it(`with hidden lastShownElement should throw an exception`, () => {
      // Arrange
      const lastShowElement = ElementUtilities.createHiddenElement();
      const exceptionRegex = new RegExp(ExceptionConstants.HAVING_ATTRIBUTE);

      // Act

      // Assert
      expect(() => callMethodWithLastShownElement(lastShowElement)).toThrowError(exceptionRegex);
    });

    it(`with hidden elements from left and with overflowing lastShownElement should not show elements`, () => {
      // Arrange
      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = document.createElement('div');
      const elements = [firstElement, secondElement];

      const lastShownElement = document.createElement('div');

      SetupStubs.setupPredicateStub(elementsPredicateService.getLastHiddenElementFromLeft, firstElement);

      const isElementOverflowing = true;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShownElement, isElementOverflowing);

      // Act
      callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(firstElement.hasAttribute('hidden')).toBeTruthy();
    });

    it(`with hidden elements from left and with overflowing lastShownElement should return false`, () => {
      // Arrange
      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = document.createElement('div');
      const elements = [firstElement, secondElement];

      const lastShownElement = document.createElement('div');

      SetupStubs.setupPredicateStub(elementsPredicateService.getLastHiddenElementFromLeft, firstElement);

      const isElementOverflowing = true;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShownElement, isElementOverflowing);

      // Act
      const result = callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(result).toBeFalsy();
    });

    it(`without hidden elements from left and not overflowing lastShownElement should not show elements`, () => {
      // Arrange
      const firstElement = document.createElement('div');
      const secondElement = ElementUtilities.createHiddenElement();
      const elements = [firstElement, secondElement];

      const lastShownElement = document.createElement('div');

      const isElementOverflowing = false;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShownElement, isElementOverflowing);

      // Act
      callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(secondElement.hasAttribute('hidden')).toBeTruthy();
    });

    it(`without hidden elements from left and not overflowing lastShownElement should return false`, () => {
      // Arrange
      const firstElement = document.createElement('div');
      const secondElement = ElementUtilities.createHiddenElement();
      const elements = [firstElement, secondElement];

      const lastShownElement = document.createElement('div');

      const isElementOverflowing = false;
      SetupStubs.setupWindowIsElementOverflowingHorizontaly(windowService, lastShownElement, isElementOverflowing);

      // Act
      const result = callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(result).toBeFalsy();
    });

    it(`with hidden elements from left and not overflowing lastShownElement should show elements until lastShownElement is overflowing`, () => {
      // Arrange
      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = ElementUtilities.createHiddenElement();
      const thirdElement = ElementUtilities.createHiddenElement();
      const elements = [firstElement, secondElement, thirdElement];

      const lastShownElement = document.createElement('div');

      elementDisplayService.tryShowElementIfNotOverflowing.and.returnValues(true, true, false);
      SetupStubs.setupPredicateStub(
        elementsPredicateService.getLastHiddenElementFromLeft,
        firstElement,
        secondElement
      );

      // Act
      callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(elementDisplayService.tryShowElementIfNotOverflowing).toHaveBeenCalledTimes(2);
    });

    it(`with hidden elements from left and not overflowing lastShownElement should return true`, () => {
      // Arrange
      const firstElement = ElementUtilities.createHiddenElement();
      const secondElement = ElementUtilities.createHiddenElement();
      const thridElement = document.createElement('div');
      const elements = [firstElement, secondElement, thridElement];

      const lastShownElement = document.createElement('div');

      elementDisplayService.tryShowElementIfNotOverflowing.and.returnValues(true, true, false);
      SetupStubs.setupPredicateStub(
        elementsPredicateService.getLastHiddenElementFromLeft,
        firstElement,
        secondElement
      );

      // Act
      const result = callMethodWithAllArguments(elements, lastShownElement);

      // Assert
      expect(result).toBeTruthy();
    });

    function callMethodWithAllArguments(elements: Element[], lastShownElement: Element): boolean {
      const result = service
        .tryShowLastHiddenElementsFromLeftUntilOverflow(elements, lastShownElement);

      return result;
    }

    function callMethodWithElements(elements: Element[]): boolean {
      const lastShowElement = document.createElement('div');
      const result = service
        .tryShowLastHiddenElementsFromLeftUntilOverflow(elements, lastShowElement);

      return result;
    }

    function callMethodWithLastShownElement(lastShowElement: Element): boolean {
      const elements = [
        document.createElement('div')
      ];
      const result = service
        .tryShowLastHiddenElementsFromLeftUntilOverflow(elements, lastShowElement);

      return result;
    }
  });
});

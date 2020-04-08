import { ElementDisplayService } from "./element-display.service";
import { ExceptionConstants } from '../shared/Constants/exception-constants';
import { ElementUtilities } from 'src/tests-common/utilities/element-utilities';
import { SetupStubs } from 'src/tests-common/utilities/setup-stubs-utilities';

describe('', () => {
  let service: any;
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
      ['isElementOverflowingHorizontaly']
    );
  });
  beforeEach(() => {
    service = new ElementDisplayService(elementsPredicateService);
  });

  describe('ElementsDisplayService', () => {
    it('should be created', () => {
      // Act
      expect(service).toBeTruthy();
    });
  });

  describe('ElementsDisplayService\'s tryShowElementIfNotOverflowing method', () => {

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
      const elementToShow = ElementUtilities.createHiddenElement();
      const lastShownElement = document.createElement('div');

      const isLastElementOverflowing = true;
      SetupStubs.setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

      // Act
      service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

      // Assert
      expect(elementToShow.hasAttribute('hidden')).toBeTruthy();
    });

    it('with not overflowing lastShownElement should show element', () => {
      // Arrange
      const elementToShow = ElementUtilities.createHiddenElement();
      const lastShownElement = document.createElement('div');

      const isLastElementOverflowing = false;
      SetupStubs.setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

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
      const lastShownElement = ElementUtilities.createHiddenElement();
      const exceptionRegex = new RegExp(ExceptionConstants.HAVING_ATTRIBUTE);

      // Act

      // Assert
      expect(() => callMethodWithLastShownElement(lastShownElement)).toThrowError(exceptionRegex);
    });

    function callMethodWithDefaultArguments(isLastElementOverflowing: boolean): boolean {
      const elementToShow = ElementUtilities.createHiddenElement();
      const lastShownElement = document.createElement('div');

      SetupStubs.setupWindowIsOverflowingFunc(windowService, lastShownElement, isLastElementOverflowing);

      const result = service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

      return result;
    }

    function callMethodWithElementToShow(elementToShow: Element): boolean {
      const lastShownElement = document.createElement('div');
      const result = service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

      return result;
    }

    function callMethodWithLastShownElement(lastShownElement: Element): boolean {
      const elementToShow = ElementUtilities.createHiddenElement();
      const result = service.tryShowElementIfNotOverflowing(elementToShow, lastShownElement);

      return result;
    }
  });
});

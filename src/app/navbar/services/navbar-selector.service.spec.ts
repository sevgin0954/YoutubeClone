import { NavbarSelectorService } from './navbar-selector.service';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';

describe('', () => {
  let service: any;

  beforeEach(() => {
    service = new NavbarSelectorService();
  });

  describe('NavbarSelectorService', () => {

    const SELECTED_CLASS = 'active';

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('with null url should throw an exception', () => {
      // Arrange
      const url = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithUrl(url)).toThrowError(exceptionRegex);
    });

    it('with empty url should throw an exception', () => {
      // Arrange
      const url = '';
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_STRING);

      // Act

      // Assert
      expect(() => callMethodWithUrl(url)).toThrowError(exceptionRegex);
    });

    it('with empty elements collection should throw an exception', () => {
      // Arrange
      const elements = [];
      const exceptionRegex = new RegExp(ExceptionConstants.EMPTY_COLLECTION);

      // Act

      // Assert
      expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
    });

    it('with null elements collection should throw an exception', () => {
      // Arrange
      const elements = null;
      const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

      // Act

      // Assert
      expect(() => callMethodWithElements(elements)).toThrowError(exceptionRegex);
    });

    it('with url should add select class to the element with data-route that mathes the last path in the url', () => {
      // Arrange
      const elementAttributeValue = 'gfd';
      const element = createElement(elementAttributeValue);
      const elements = [
        createElement('abc'),
        element
      ];
      const url = `asasd/${elementAttributeValue}`;

      // Act
      service.selectCurrentPageLink(elements, url);

      // Assert
      expect(element.classList.contains(SELECTED_CLASS)).toBeTruthy();
    });

    it('with url should add select class to only one element', () => {
      // Arrange
      const elementAttributeValue = 'gfd';
      const element = createElement(elementAttributeValue);
      const elements = [
        createElement('abc'),
        element
      ];
      const url = `asasd/${elementAttributeValue}`;

      // Act
      service.selectCurrentPageLink(elements, url);

      // Assert
      const selectedElements = elements.filter(e => e.classList.contains(SELECTED_CLASS));
      expect(selectedElements.length).toEqual(1);
    });

    function callMethodWithElements(elements: Element[]): void {
      const url = '/asda';
      service.selectCurrentPageLink(elements, url);
    }

    function callMethodWithUrl(url: string): void {
      const elements = [
        document.createElement('div')
      ];
      service.selectCurrentPageLink(elements, url);
    }

    function createElement(dataRouteValue: string): Element {
      const element: Element = document.createElement('div');
      element.setAttribute('data-route', dataRouteValue);

      return element;
    }
  });
});

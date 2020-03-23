import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

export class NavbarSelectorServiceValidator {
  static validateElement(element: Element, urlPath: string): void {
    if (element == null) {
      const exceptionMessage = ExceptionConstants.NOT_FOUND + ` No element matches /${urlPath} path.`;
      throw Error(exceptionMessage);
    }
  }

  static validateUrlPaths(paths: string[]): void {
    if (paths.length === 0) {
      const exceptionMessage =
        ExceptionConstants.INVALID_ARGUMENT + ' No paths in the url.';
      throw Error(exceptionMessage);
    }
  }

  static validateSelectCurrentPageLinkArguments(elements: Element[], url: string): void {
    DataValidator.validateCollection(elements, 'elements');
    DataValidator.validateString(url, 'url');
  }
}

import { ExceptionConstants } from '../Constants/exception-constants';

export class ElementValidator {
  public static hasAttribute(element: Element, attribute: string): void {
    if (element.hasAttribute(attribute) === false) {
      const exceptionMessage = ExceptionConstants.MISSING_ATTRIBUTE + ` Attribute name: ${attribute}`;
      throw Error(exceptionMessage);
    }
  }

  public static doesNotHaveAttribute(element: Element, attribute: string): void {
    if (element.hasAttribute(attribute)) {
      const exceptionMessage = ExceptionConstants.HAVING_ATTRIBUTE + ` Attribute name: ${attribute}`;
      throw Error(exceptionMessage);
    }
  }
}

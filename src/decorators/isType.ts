import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { SimpleChanges } from '@angular/core';

export default function isType(requiredType: 'string' | 'object' | 'number' | 'function'): Function {
  return (targetPrototype: any, propertyName: string) => {

    const NG_ON_CHANGES_NAME = 'ngOnChanges';

    /** ngOnChanges might not be implemented by this component */
    const ngOnChangesClone: Function | null = targetPrototype[NG_ON_CHANGES_NAME];

    Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
      value: propertyValue
    });

    function propertyValue(changes: SimpleChanges): void {
      const argumentType = typeof this[propertyName];
      if (argumentType !== requiredType) {
        const className = targetPrototype.constructor.name;
        const argumentsInfo =
          `Input name: ${propertyName}; ` +
          `Class name: ${className}; ` +
          `Required type: ${requiredType}; ` +
          `Actual type: ${argumentType}`;
        const exceptionMessage = ExceptionConstants.INCORRECT_TYPE + ' ' + argumentsInfo;
        throw TypeError(exceptionMessage);
      }

      if (ngOnChangesClone) {
        ngOnChangesClone.call(this, changes);
      }
    }
  }
}

import { SimpleChanges } from '@angular/core';
import { ExceptionConstants } from '../shared/constants/exception-constants';

// TODO: Test and implement
export default function isLengthInRange(
  minNumber: number,
  maxNumber: number = Number.MAX_SAFE_INTEGER
): Function {
  return (targetPrototype: any, propertyName: string) => {
    const NG_ON_CHANGES_NAME = 'ngOnChanges';

    /** ngOnChanges might not be implemented by this component */
    const ngOnChangesOriginalFunc: Function | null = targetPrototype[NG_ON_CHANGES_NAME];

    Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
      value: onChangesNewFunc,
      configurable: true
    });

    function onChangesNewFunc(changes: SimpleChanges): void {
      const propertyValue = this[propertyName];
      if (propertyValue.length < minNumber || propertyValue.length > maxNumber) {
        const className = targetPrototype.constructor.name;
        const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
        const exceptionMessage = ExceptionConstants.INCORRECT_LENGTH + ' ' + argumentsInfo;
        throw Error(exceptionMessage);
      }

      if (ngOnChangesOriginalFunc) {
        ngOnChangesOriginalFunc.call(this, changes);
      }
    }
  }
}

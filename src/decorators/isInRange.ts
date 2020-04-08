import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { SimpleChanges } from '@angular/core';

export default function isInRange(
  minNumber: number,
  maxNumber: number = Number.MAX_SAFE_INTEGER
): Function {
  return (targetPrototype: any, propertyName: string) => {
    const NG_ON_CHANGES_NAME = 'ngOnChanges';

    /** ngOnChanges might not be implemented by this component */
    const ngOnChangesOriginalFunc: Function | null = targetPrototype[NG_ON_CHANGES_NAME];

    Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
      value: onChangesNewFunc
    });

    function onChangesNewFunc(changes: SimpleChanges): void {
      const propertyValue = this[propertyName];
      if (propertyValue < minNumber || propertyValue > maxNumber) {
        const className = targetPrototype.constructor.name;
        const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
        const exceptionMessage = ExceptionConstants.NUMBER_OUT_OF_RANGE + ' ' + argumentsInfo;
        throw Error(exceptionMessage);
      }

      if (ngOnChangesOriginalFunc) {
        ngOnChangesOriginalFunc.call(this, changes);
      }
    }
  }
}

import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';

export default function isInRange(
  minNumber: number,
  maxNumber: number = Number.MAX_SAFE_INTEGER
): Function {
  return (targetPrototype: any, propertyName: string) => {
    const NG_ON_CHANGES_NAME = 'ngOnChanges';

    /** ngOnChanges might not be implemented by this component */
    const ngOnChangesClone: Function | null = targetPrototype[NG_ON_CHANGES_NAME];

    Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
      value: propertyValue
    });

    function propertyValue(): void {
      const propertyValue = this[propertyName];
      if (propertyValue < minNumber || propertyValue > maxNumber) {
        const className = targetPrototype.constructor.name;
        const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
        const exceptionMessage = ExceptionConstants.NUMBER_OUT_OF_RANGE + ' ' + argumentsInfo;
        throw Error(exceptionMessage);
      }

      if (ngOnChangesClone) {
        ngOnChangesClone.call(this);
      }
    }
  }
}

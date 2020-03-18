import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';

export default function isRequired(targetPrototype: any, propertyName: string): void {

  const NG_ON_CHANGES_NAME = 'ngOnChanges';
  const NG_ON_INIT_NAME = 'ngOnInit';

  /** ngOnChanges might not be implemented by this component */
  const ngOnChangesClone: Function | null = targetPrototype[NG_ON_CHANGES_NAME];

  Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
    value: propertyValue
  });
  Object.defineProperty(targetPrototype, NG_ON_INIT_NAME, {
    value: propertyValue
  });

  function propertyValue(): void {
    const propertyValue = this[propertyName];
    if (propertyValue === null || propertyValue === undefined) {
      const className = targetPrototype.constructor.name;
      const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
      const exceptionMessage = ExceptionConstants.REQUIRED_INPUT + ' ' + argumentsInfo;
      throw Error(exceptionMessage);
    }

    if (ngOnChangesClone) {
      ngOnChangesClone.call(this);
    }
  }
}

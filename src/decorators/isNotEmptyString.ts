import { DataValidator } from 'src/app/shared/Validation/data-validator';

export default function isNotEmptyString(targetPrototype: any, propertyName: string): void {

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
    const className = targetPrototype.constructor.name;
    const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
    DataValidator.emptyString(this[propertyName], argumentsInfo);

    if (ngOnChangesClone) {
      ngOnChangesClone.call(this);
    }
  }
}

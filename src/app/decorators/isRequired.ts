import { SimpleChanges } from '@angular/core';

import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';

export default function isRequired(targetPrototype: any, propertyName: string): void {

  const NG_ON_CHANGES_NAME = 'ngOnChanges';
  const NG_ON_INIT_NAME = 'ngOnInit';

  /** ngOnChanges might not be implemented by this component */
  const ngOnChangesOriginalFunc: Function | null = targetPrototype[NG_ON_CHANGES_NAME];
  const ngOnInitOriginalFunc: Function | null = targetPrototype[NG_ON_INIT_NAME];

  Object.defineProperty(targetPrototype, NG_ON_INIT_NAME, {
    value: onInitNewFunc,
    configurable: true
  });
  Object.defineProperty(targetPrototype, NG_ON_CHANGES_NAME, {
    value: onChangesNewFunc,
    configurable: true
  });

  function onChangesNewFunc(changes: SimpleChanges): void {
    validate.call(this);

    if (ngOnChangesOriginalFunc) {
      ngOnChangesOriginalFunc.call(this, changes);
    }
  }

  function onInitNewFunc(): void {
    validate.call(this);

    if (ngOnInitOriginalFunc) {
      ngOnInitOriginalFunc.call(this);
    }
  }

  function validate(): void {
    const propertyValue = this[propertyName];
    if (propertyValue === null || propertyValue === undefined) {
      const className = targetPrototype.constructor.name;
      const argumentsInfo = `Input name: ${propertyName}; class name: ${className}`;
      const exceptionMessage = ExceptionConstants.REQUIRED_INPUT + ' ' + argumentsInfo;
      throw Error(exceptionMessage);
    }
  }
}

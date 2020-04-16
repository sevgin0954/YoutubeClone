import { Injectable } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import { DataValidator } from '../shared/validation/data-validator';
import { ElementValidator } from '../shared/validation/element-validator';

@Injectable({
  providedIn: 'root'
})
export class ElementDisplayService {

  constructor(
    private windowService: WindowService
  ) { }

  tryShowElementIfNotOverflowing(elementToShow: Element, lastShownElement: Element): boolean {
    this.validateElementToShow(elementToShow);
    this.validateLastShownElement(lastShownElement);

    let isElementShown = true;

    elementToShow.removeAttribute('hidden');
    const isLastElementOverflowing = this.windowService.isElementOverflowingHorizontaly(lastShownElement);
    if (isLastElementOverflowing) {
      elementToShow.setAttribute('hidden', 'hidden');
      isElementShown = false;
    }

    return isElementShown;
  }

  private validateElementToShow(elementToShow: Element): void {
    DataValidator.nullOrUndefinied(elementToShow, 'elementToShow');
    ElementValidator.hasAttribute(elementToShow, 'hidden');
  }

  private validateLastShownElement(lastShownElement: Element): void {
    DataValidator.nullOrUndefinied(lastShownElement, 'lastShownElement');
    ElementValidator.doesNotHaveAttribute(lastShownElement, 'hidden');
  }
}

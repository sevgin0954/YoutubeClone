import { Injectable } from '@angular/core';

import { DataValidator } from '../shared/validation/data-validator';
import { ExceptionConstants } from '../shared/constants/exception-constants';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isElementInsideTheScreenVerticaly(element: Element): boolean {
    this.validateElement(element);

    const rect: ClientRect = element.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;
    const isTopInside = rect.top <= windowHeight && rect.top >= 0;
    const isBottomInside = rect.bottom >= 0 && rect.bottom <= windowHeight;

    return isTopInside || isBottomInside;
  }

  isElementOverflowingHorizontaly(element: Element): boolean {
    this.validateElement(element);

    const rect: ClientRect = element.getBoundingClientRect();
    const isRightSideOverflowing = rect.right > document.body.clientWidth;
    const isLeftSideOverflowing = rect.left < 0;

    return isRightSideOverflowing || isLeftSideOverflowing;
  }

  private validateElement(element: Element): void {
    DataValidator.nullOrUndefinied(element, 'element');

    if (element.hasAttribute('hidden')) {
      const message =
        ExceptionConstants.HAVING_ATTRIBUTE + ' Argument name: element; Attribute name: hidden';
      throw Error(message);
    }
  }
}

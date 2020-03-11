import { Injectable } from '@angular/core';

import { DataValidator } from '../shared/Validation/data-validator';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isElementOverflowingVerticaly(element: Element): boolean {
    this.validateElement(element);

    let isOverflowing = false;

    let rect: ClientRect = element.getBoundingClientRect();
    const isRightSideOverflowing = rect.right > window.screen.width;
    const isLeftSideOverflowing = rect.left < 0;
    if (isRightSideOverflowing || isLeftSideOverflowing) {
      isOverflowing = true;
    }

    return isOverflowing;
  }

  private validateElement(element: Element): void {
    DataValidator.nullOrUndefinied(element, 'element');

    if (element.hasAttribute('hidden')) {
      const message =
        ExceptionConstants.HAVING_ATTRIBUTE + ' Argument name: element; Attribute name: hidden';
      throw Error(message);
    }
  }

  onReachBottom(callback: Function): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      callback();
    }
  }
}

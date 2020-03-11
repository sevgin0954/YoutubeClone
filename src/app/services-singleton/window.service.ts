import { Injectable } from '@angular/core';

import { DataValidator } from '../shared/Validation/data-validator';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  // TODO: Should't work for hidden elements
  isElementOverflowing(element: Element): boolean {
    DataValidator.nullOrUndefinied(element, 'element');

    let isOverflowing = this.isElementOverflowingRecursive(element);

    return isOverflowing;
  }

  private isElementOverflowingRecursive(element: Element): boolean {
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
    DataValidator
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

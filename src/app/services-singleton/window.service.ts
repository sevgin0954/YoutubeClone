import { Injectable } from '@angular/core';
import { DataValidator } from '../shared/Validation/data-validator';

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
    let isOverflowing = false;

    let rect: ClientRect = element.getBoundingClientRect();

    const isElemntHidden = element.hasAttribute('hidden');
    if (isElemntHidden) {
      element.removeAttribute('hidden');

      rect = element.getBoundingClientRect();
      isOverflowing = this.isElementOverflowing(element);

      element.setAttribute('hidden', 'hidden');
    }
    else if (this.isElementInsideTheScreen(rect) === false) {
      isOverflowing = true;
    }

    return isOverflowing;
  }

  private isElementInsideTheScreen(elementRect: ClientRect): boolean {
    const windowScreen = window.screen;

    const isTopSideInside = elementRect.top >= 0;
    const isRightSideInside = elementRect.right <= windowScreen.width;
    const isBottomSideInside = elementRect.bottom <= windowScreen.height;
    const isLeftSideInside = elementRect.left >= 0;

    return isTopSideInside && isRightSideInside && isBottomSideInside && isLeftSideInside;
  }

  onReachBottom(callback: Function): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      callback();
    }
  }
}

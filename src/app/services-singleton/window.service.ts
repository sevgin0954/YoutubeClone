import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  isElementOverflowing(element: HTMLElement): boolean {
    let isOverflowing = false;

    let rect: ClientRect = element.getBoundingClientRect();
    if (rect.right === 0) {
      element.removeAttribute('hidden');

      rect = element.getBoundingClientRect();
      isOverflowing = this.isElementOverflowing(element);

      element.setAttribute('hidden', 'hidden');
    }
    else if (rect.right > window.screen.width) {
      isOverflowing = true;
    }

    return isOverflowing;
  }

  onReachBottom(callback: Function): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      callback();
    }
  }
}

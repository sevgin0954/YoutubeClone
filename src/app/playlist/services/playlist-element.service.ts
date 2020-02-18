import { Injectable } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';

@Injectable()
export class PlaylistElementService {

  constructor(
    private elementsPredicateService: ElementsPredicateService,
    private windowService: WindowService
  ) {}

  hideFirstShownElement(playlistElements: HTMLCollection): void {
    const firstShownElement =
      this.getFirstElement(playlistElements, this.elementsPredicateService.getFirstShownElement);
    firstShownElement.setAttribute('hidden', 'hidden');
  }

  private getFirstElement(
    elements: HTMLCollection,
    predicate: (element: Element, index: number, elements: Element[]) => boolean
  ): Element {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element;
  }

  tryShowElementIfNotOverflowing(elementToShow: HTMLElement, lastShownElement: HTMLElement): boolean {
    let isElementShown = true;

    elementToShow.removeAttribute('hidden');
    const isLastElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
    if (isLastElementOverflowing) {
      elementToShow.setAttribute('hidden', 'hidden');
      isElementShown = false;
    }

    return isElementShown;
  }

  tryShowLeftHiddenElements(playlistElements: HTMLElement[]): void {
    const firstElement = playlistElements[0];
    const isFirstElementHidden = firstElement.hasAttribute('hidden');
    if (isFirstElementHidden === false) {
      return;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        playlistElements
          .find(this.elementsPredicateService.getLastHiddenElementFromLeft);
      const lastShownElement =
        playlistElements
          .find(this.elementsPredicateService.getLastShownElement);
      if (lastHiddenElementFromLeft && lastShownElement) {
        const isElementShown = this.tryShowElementIfNotOverflowing(lastHiddenElementFromLeft, lastShownElement);
        isThereMoreSpace = isElementShown;
      }
      else {
        isThereMoreSpace = false;
      }
    }
  }
}

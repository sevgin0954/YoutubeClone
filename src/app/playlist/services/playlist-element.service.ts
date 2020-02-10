import { Injectable } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';

@Injectable()
export class PlaylistElementService {

  constructor(
    private elementsPredicateService: ElementsPredicateService,
    private windowService: WindowService
  ) {}

  hideFirstShownElement(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = playlist.children;
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

  tryShowElement(elementToShow: HTMLElement, lastShownElement: HTMLElement): boolean {
    let isElementShown = true;

    elementToShow.removeAttribute('hidden');
    const isLastElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
    if (isLastElementOverflowing) {
      elementToShow.setAttribute('hidden', 'hidden');
      isElementShown = false;
    }

    return isElementShown;
  }
}

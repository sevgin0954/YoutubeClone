import { Injectable } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';

@Injectable({
  providedIn: 'root'
})
export class ElementDisplayService {

  constructor(
    private elementsPredicateService: ElementsPredicateService,
    private windowService: WindowService
  ) { }

  hideFirstHiddenElementFromRight(playlistElements: Element[]): void {
    const firstHiddenElementFromRight = playlistElements
      .find(this.elementsPredicateService.getFirstHiddenElementFromRight);
    firstHiddenElementFromRight.removeAttribute('hidden');
  }

  hideFirstShownElement(playlistElements: Element[]): void {
    const firstShownElement = playlistElements.find(e => e.hasAttribute('hidden') === false);
    firstShownElement.setAttribute('hidden', 'hidden');
  }

  hideLastShowElement(playlistElements: Element[]): void {
    const lastShownElement = playlistElements.find(this.elementsPredicateService.getLastShownElement);
    lastShownElement.setAttribute('hidden', 'hidden');
  }

  showLastHiddenElementFromLeft(playlistElements: Element[]): void {
    const lastHiddenElementFromLeft = playlistElements
      .find(this.elementsPredicateService.getLastHiddenElementFromLeft);
    lastHiddenElementFromLeft.removeAttribute('hidden');
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

  tryHideRightOverflowingElements(playlistElements: Element[], lastShownElement: HTMLElement): boolean {
    let isSuccessful = false;

    let isThereShownElelement = this.isThereVisibleElement(playlistElements);
    let isLastShowElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
    while (isLastShowElementOverflowing && isThereShownElelement) {
      this.hideLastShowElement(playlistElements);

      isLastShowElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
      isThereShownElelement = this.isThereVisibleElement(playlistElements);

      isSuccessful = true;
    }

    return isSuccessful;
  }

  private isThereVisibleElement(playlistElements: Element[]): boolean {
    const isThereShownElelement = playlistElements
      .find(e => e.hasAttribute('hidden') === false);

    return isThereShownElelement !== undefined;
  }

  tryShowLeftHiddenElements(playlistElements: HTMLElement[], endElement: HTMLElement): boolean {
    let isSuccessful = false;

    const firstElement = playlistElements[0];
    const isFirstElementHidden = firstElement.hasAttribute('hidden');
    if (isFirstElementHidden === false) {
      return isSuccessful;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        playlistElements
          .find(this.elementsPredicateService.getLastHiddenElementFromLeft);
      if (lastHiddenElementFromLeft) {
        const isElementShown =
          this.tryShowElementIfNotOverflowing(lastHiddenElementFromLeft, endElement);
        if (isElementShown) {
          isSuccessful = true;
        }

        isThereMoreSpace = isElementShown;
      }
      else {
        isThereMoreSpace = false;
      }
    }

    return isSuccessful;
  }

  tryShowRightHiddenElements(playlistElements: HTMLElement[], endElement: HTMLElement): boolean {
    let isSuccessful = false;

    const lastElement = playlistElements[playlistElements.length - 1];
    const isLastElementHidden = lastElement.hasAttribute('hidden');
    if (isLastElementHidden === false) {
      return isSuccessful;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const firstHiddenElementFromRight = playlistElements
        .find(this.elementsPredicateService.getFirstHiddenElementFromRight);
      if (firstHiddenElementFromRight) {
        const isElementShown =
          this.tryShowElementIfNotOverflowing(firstHiddenElementFromRight, endElement);
        if (isElementShown) {
          isSuccessful = true;
        }

        isThereMoreSpace = isElementShown;
      }
      else {
        isThereMoreSpace = false;
      }
    }

    return isSuccessful;
  }
}

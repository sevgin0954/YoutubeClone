import { Injectable } from '@angular/core';

import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';
import { DataValidator } from 'src/app/shared/Validation/data-validator';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { ElementValidator } from 'src/app/shared/validation/element-validator';
import { WindowService } from 'src/app/services-singleton/window.service';
import { ElementDisplayService } from 'src/app/services-singleton/element-display.service';

@Injectable()
export class PlaylistElementService {

  constructor(
    private elementDisplayService: ElementDisplayService,
    private elementsPredicateService: ElementsPredicateService,
    private windowService: WindowService
  ) { }

  showFirstHiddenElementFromRight(elements: Element[]): void {
    this.validateElements(elements);

    const firstHiddenElementFromRight = elements
      .find(this.elementsPredicateService.getFirstHiddenElementFromRight);

    this.validateFoundElement(firstHiddenElementFromRight);

    firstHiddenElementFromRight.removeAttribute('hidden');
  }

  hideFirstShownElement(elements: Element[]): void {
    this.validateElements(elements);

    const firstShownElement = elements.find(e => e.hasAttribute('hidden') === false);
    this.validateFoundElement(firstShownElement);
    firstShownElement.setAttribute('hidden', 'hidden');
  }

  hideLastShowElement(elements: Element[]): void {
    this.validateElements(elements);

    const lastShownElement = elements.find(this.elementsPredicateService.getLastShownElement);
    this.validateFoundElement(lastShownElement);
    lastShownElement.setAttribute('hidden', 'hidden');
  }

  showLastHiddenElementFromLeft(elements: Element[]): void {
    this.validateElements(elements);

    const lastHiddenElementFromLeft = elements
      .find(this.elementsPredicateService.getLastHiddenElementFromLeft);

    this.validateFoundElement(lastHiddenElementFromLeft);

    lastHiddenElementFromLeft.removeAttribute('hidden');
  }

  tryHideRightOverflowingElements(elements: Element[], lastShownElement: Element): boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    let isThereShownElement = this.isThereShownElement(elements);
    let isLastShowElementOverflowing = this.windowService.isElementOverflowingHorizontaly(lastShownElement);
    while (isLastShowElementOverflowing && isThereShownElement) {
      this.hideLastShowElement(elements);

      isLastShowElementOverflowing = this.windowService.isElementOverflowingHorizontaly(lastShownElement);
      isThereShownElement = this.isThereShownElement(elements);

      isSuccessful = true;
    }

    return isSuccessful;
  }

  private isThereShownElement(elements: Element[]): boolean {
    const isThereShownElelement = elements
      .find(e => e.hasAttribute('hidden') === false);

    return isThereShownElelement !== undefined;
  }

  tryShowHiddenElementsFromBeginingUntilOverflow(elements: Element[], lastShownElement: Element):
  boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    const firstElement = elements[0];
    const isFirstElementHidden = firstElement.hasAttribute('hidden');
    if (isFirstElementHidden === false) {
      return isSuccessful;
    }

    for (let i = 0; i < elements.length; i++) {
      const currentElement = elements[i];

      if (currentElement.hasAttribute('hidden') === false) {
        break;
      }

      const isCurrentElementShown = this.elementDisplayService
        .tryShowElementIfNotOverflowing(currentElement, lastShownElement);
      if (isCurrentElementShown) {
        isSuccessful = true;
      }
    }

    return isSuccessful;
  }

  tryShowLastHiddenElementsFromLeftUntilOverflow(elements: Element[], lastShownElement: Element): boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    // If the first element is not hidden there are no hidden elements on the left side
    const firstElement = elements[0];
    const isFirstElementHidden = firstElement.hasAttribute('hidden');
    if (isFirstElementHidden === false) {
      return isSuccessful;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        elements.find(this.elementsPredicateService.getLastHiddenElementFromLeft);
      if (lastHiddenElementFromLeft) {
        const isElementShown = this.elementDisplayService
          .tryShowElementIfNotOverflowing(lastHiddenElementFromLeft, lastShownElement);
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

  tryShowFirstHiddenElementsFromRightUntilOverflow(elements: Element[], lastShownElement: Element): boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    // If the last element is not hidden there are no hidden elements on the left side
    const lastElement = elements[elements.length - 1];
    const isLastElementHidden = lastElement.hasAttribute('hidden');
    if (isLastElementHidden === false) {
      return isSuccessful;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const firstHiddenElementFromRight = elements
        .find(this.elementsPredicateService.getFirstHiddenElementFromRight);
      if (firstHiddenElementFromRight) {
        const isElementShown = this.elementDisplayService
          .tryShowElementIfNotOverflowing(firstHiddenElementFromRight, lastShownElement);
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

  private validateElements(elements: Element[]): void {
    const argumentName = 'elements';

    DataValidator.nullOrUndefinied(elements, argumentName);
    DataValidator.emptyCollection(elements, argumentName);
  }

  private validateFoundElement(element: Element): void {
    if (!element) {
      throw Error(ExceptionConstants.NOT_FOUND);
    }
  }

  private validateLastShownElement(lastShownElement: Element): void {
    DataValidator.nullOrUndefinied(lastShownElement, 'lastShownElement');
    ElementValidator.doesNotHaveAttribute(lastShownElement, 'hidden');
  }
}

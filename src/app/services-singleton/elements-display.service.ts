import { Injectable } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';
import { DataValidator } from '../shared/Validation/data-validator';
import { ExceptionConstants } from '../shared/Constants/exception-constants';
import { ElementValidator } from '../shared/validation/element-validator';

@Injectable({
  providedIn: 'root'
})
export class ElementDisplayService {

  constructor(
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

  tryShowElementIfNotOverflowing(elementToShow: Element, lastShownElement: Element): boolean {
    this.validateElementToShow(elementToShow);
    this.validateLastShownElement(lastShownElement);

    let isElementShown = true;

    elementToShow.removeAttribute('hidden');
    const isLastElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
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

  tryHideRightOverflowingElements(elements: Element[], lastShownElement: Element): boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    let isThereShownElement = this.isThereVisibleElement(elements);
    let isLastShowElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
    while (isLastShowElementOverflowing && isThereShownElement) {
      this.hideLastShowElement(elements);

      isLastShowElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
      isThereShownElement = this.isThereVisibleElement(elements);

      isSuccessful = true;
    }

    return isSuccessful;
  }

  private isThereVisibleElement(elements: Element[]): boolean {
    const isThereShownElelement = elements
      .find(e => e.hasAttribute('hidden') === false);

    return isThereShownElelement !== undefined;
  }

  tryShowLeftHiddenElements(elements: Element[], lastShownElement: Element): boolean {
    this.validateElements(elements);
    this.validateLastShownElement(lastShownElement);

    let isSuccessful = false;

    const firstElement = elements[0];
    const isFirstElementHidden = firstElement.hasAttribute('hidden');
    if (isFirstElementHidden === false) {
      return isSuccessful;
    }

    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        elements
          .find(this.elementsPredicateService.getLastHiddenElementFromLeft);
      if (lastHiddenElementFromLeft) {
        const isElementShown =
          this.tryShowElementIfNotOverflowing(lastHiddenElementFromLeft, lastShownElement);
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

  tryShowRightHiddenElements(elements: Element[], endElement: Element): boolean {
    let isSuccessful = false;

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

  private validateLastShownElement(lastShownElement: Element): void {
    DataValidator.nullOrUndefinied(lastShownElement, 'lastShownElement');
    ElementValidator.doesNotHaveAttribute(lastShownElement, 'hidden');
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
}

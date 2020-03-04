import { Injectable } from '@angular/core';
import { DataValidator } from '../shared/Validation/data-validator';

@Injectable({
  providedIn: 'root'
})
export class ElementsPredicateService {

  getFirstHiddenElementFromRight = (currentElement: Element, index: number, elements: Element[]): boolean => {
    this.validateArguments(currentElement, index, elements);

    let isPreviousElementVisible = false;
    if (index > 0) {
      const previousElement = elements[index - 1];
      isPreviousElementVisible = previousElement.hasAttribute('hidden') === false;
    }
    const isCurrentElementHidden = currentElement.hasAttribute('hidden');

    return isPreviousElementVisible && isCurrentElementHidden;
  }

  getLastHiddenElementFromLeft = (currentElement: Element, index: number, elements: Element[]): boolean => {
    this.validateArguments(currentElement, index, elements);

    const isCurrentElementHidden = currentElement.hasAttribute('hidden');
    let isNextElementVisible = false;
    const nextIndex = index + 1;
    if (nextIndex < elements.length) {
      isNextElementVisible = elements[nextIndex].hasAttribute('hidden') === false
    }

    return isCurrentElementHidden && isNextElementVisible;
  }

  getLastShownElement = (currentElement: Element, index: number, elements: Element[]): boolean => {
    this.validateArguments(currentElement, index, elements);

    const isCurrentElementShown = currentElement.hasAttribute('hidden') === false;
    let isNextElementHidden = true;

    const nextElementIndex = index + 1;
    if (nextElementIndex < elements.length) {
      isNextElementHidden = elements[nextElementIndex].hasAttribute('hidden');
    }

    return isCurrentElementShown && isNextElementHidden;
  }

  private validateArguments(currentElement: Element, index: number, elements: Element[]): void {
    DataValidator.nullOrUndefinied(currentElement, 'currentElement');
    DataValidator.validateCollection(elements, 'elements');
    DataValidator.validateIndex(index, elements, 'index');
  }
}

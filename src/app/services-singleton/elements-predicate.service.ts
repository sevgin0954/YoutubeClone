import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementsPredicateService {

  getFirstHiddenElementFromRight(element: Element, index: number, elements: Element[]): boolean {
    let isPreviousElementVisible = false;
    if (index > 0) {
      const previousElement = elements[index - 1];
      isPreviousElementVisible = previousElement.hasAttribute('hidden') === false;
    }
    const isCurrentElementHidden = element.hasAttribute('hidden');

    return isPreviousElementVisible && isCurrentElementHidden;
  }

  getLastHiddenElementFromLeft(element: Element, index: number, elements: Element[]): boolean {
    const isCurrentElementHidden = element.hasAttribute('hidden');
    let isNextElementVisible = true;
    const nextIndex = index + 1;
    if (nextIndex < elements.length) {
      isNextElementVisible = elements[nextIndex].hasAttribute('hidden') === false
    }

    return isCurrentElementHidden && isNextElementVisible;
  }

  getLastShownElement(element: Element, index: number, elements: Element[]): boolean {
    const isCurrentElementShown = element.hasAttribute('hidden') === false;
    let isNextElementHidden = true;

    const nextElementIndex = index + 1;
    if (nextElementIndex < elements.length) {
      isNextElementHidden = elements[nextElementIndex].hasAttribute('hidden');
    }

    return isCurrentElementShown && isNextElementHidden;
  }
}

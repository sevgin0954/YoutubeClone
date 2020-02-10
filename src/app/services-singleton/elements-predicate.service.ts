import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementsPredicateService {

  getFirstShownElement(element: Element, index: number, elements: Element[]): boolean {
    let isPreviousElementHidden = true;
    if (index > 0) {
      isPreviousElementHidden = elements[index - 1].hasAttribute('hidden');
    }
    const isCurrentElementVisible = element.hasAttribute('hidden') === false;

    return isPreviousElementHidden && isCurrentElementVisible;
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

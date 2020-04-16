import { Injectable } from '@angular/core';

import { DataValidator } from 'src/app/shared/validation/data-validator';

@Injectable({
  providedIn: 'root'
})
export class NavbarSelectorService {

  selectCurrentPageLink(elements: Element[], url: string): void {
    DataValidator.validateCollection(elements, 'elements');
    DataValidator.validateString(url, 'url');

    this.removeClass(elements, 'active');

    const urlParts = url.split('?');
    const urlPaths = urlParts[0].split('/').filter(path => path !== '');
    const urlLastPath = urlPaths[urlPaths.length - 1];
    const selectedElement = this.findElementWithAttribute(elements, 'data-route', urlLastPath);
    if (selectedElement) {
      selectedElement.classList.add('active');
    }
  }

  private findElementWithAttribute(
    elements: Element[],
    attributeName: string,
    attributeValue: string
  ): Element {
    const selectedElement = elements.find(n => n.getAttribute(attributeName) === attributeValue);

    return selectedElement;
  }

  private removeClass(elements: Element[], className: string): void {
    elements.forEach(n => n.classList.remove(className));
  }
}

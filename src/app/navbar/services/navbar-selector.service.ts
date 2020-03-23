import { Injectable } from '@angular/core';

import { NavbarSelectorServiceValidator as ServiceValidator } from './navbar-selector.service.validator';

@Injectable({
  providedIn: 'root'
})
export class NavbarSelectorService {

  selectCurrentPageLink(elements: Element[], url: string): void {
    ServiceValidator.validateSelectCurrentPageLinkArguments(elements, url);

    this.removeClass(elements, 'active');

    const urlParts = url.split('?');
    const urlPaths = urlParts[0].split('/').filter(path => path !== '');

    ServiceValidator.validateUrlPaths(urlPaths);

    const urlLastPath = urlPaths[urlPaths.length - 1];
    const selectedElement = this.findElementWithAttribute(elements, 'data-route', urlLastPath);

    ServiceValidator.validateElement(selectedElement, urlLastPath);

    selectedElement.classList.add('active');
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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarSelectorService {

  constructor(
    private router: Router
  ) { }

  selectCurrentPageLink(children: Element[]): void {
    this.removeClass(children, 'active');

    const urlParts = this.router.url.split('?');
    const urlPaths = urlParts[0].split('/');
    const urlLastPath = urlPaths[urlPaths.length - 1];
    const selectedElement = this.findElementWithAttribute(children, 'data-route', urlLastPath);
    if (selectedElement) {
      selectedElement.classList.add('active');
    }
  }

  private findElementWithAttribute(
    children: Element[],
    attributeName: string,
    attributeValue: string
  ): Element {
    const elementsAsArray = Array.from(children);
    const selectedElement = elementsAsArray
      .find(n => (n as Element).getAttribute(attributeName) === attributeValue);

    return <Element>selectedElement;
  }

  private removeClass(elements: Element[], className: string): void {
    elements.forEach(n => n.classList.remove(className));
  }
}

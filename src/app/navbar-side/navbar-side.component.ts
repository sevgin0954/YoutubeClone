import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewChecked {

  @ViewChild('buttonList', {static: false})
  buttonList: ElementRef;

  constructor(
    private router: Router) { }

  ngAfterViewChecked(): void {
    this.selectCurrentPageLink();
  }

  private selectCurrentPageLink(): void {
    const ulNodes = this.buttonList.nativeElement.childNodes;

    this.removeClass(ulNodes, 'active');

    const currentRoute = this.router.url.slice(1);
    const selectedElement = this.findElementWithAttribute(ulNodes, 'data-route', currentRoute);
    if (selectedElement) {
      selectedElement.classList.add('active');
    }
  }

  private findElementWithAttribute(nodes: NodeList, attributeName: string, attributeValue: string): Element {
    const elementsAsArray = Array.from(nodes);
    const selectedElement = elementsAsArray
      .find(n => (n as Element).getAttribute(attributeName) === attributeValue);

    return <Element>selectedElement;
  }

  private removeClass(nodes: NodeList, className: string): void {
    nodes.forEach(n => (n as Element).classList.remove(className));
  }

}

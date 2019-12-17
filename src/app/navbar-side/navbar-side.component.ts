import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, OnChanges, DoCheck, AfterViewChecked } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewChecked {

  @ ViewChild('buttonList', {static: false})
  buttonList: ElementRef;

  constructor(private location: Location) { }

  ngAfterViewChecked(): void {
    this.selectCurrentPageLink();
  }

  private selectCurrentPageLink(): void {
    const ulNodes = this.buttonList.nativeElement.childNodes;

    this.removeClass(ulNodes, 'active');

    const currentPath = this.location.path().slice(1);
    const selectedElement = this.findElementWithAttribute(ulNodes, 'data-route', currentPath);
    selectedElement.classList.add('active');
  }

  // TODO: Move to shared class
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

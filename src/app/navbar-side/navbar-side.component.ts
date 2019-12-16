import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements OnInit, AfterViewInit {

  @ViewChild('buttonList', {static: false})
  buttonList: ElementRef;

  constructor(private location: Location) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const currentPath = this.location.path().slice(1);

    const ulNodes = this.buttonList.nativeElement.childNodes;
    const selectedElement = this.findElementWithAttribute(ulNodes, 'data-route', currentPath);
    selectedElement.classList.add('active');
  }

  // TODO: Move to shared class
  private findElementWithAttribute(elements: NodeList, attributeName: string, attributeValue: string): Element {
    const elementsAsArray = Array.from(elements);
    const selectedElement = elementsAsArray
      .find(n => (n as Element).getAttribute(attributeName) === attributeValue);

    return <Element>selectedElement;
  }

}

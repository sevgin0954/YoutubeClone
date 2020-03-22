import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';

import { NavbarSelectorService } from '../services/navbar-selector.service';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewChecked {

  @ViewChild('buttonList', {static: false}) buttonList: ElementRef;

  constructor(
    private navbarSelectorService: NavbarSelectorService
  ) { }

  ngAfterViewChecked(): void {
    const ulElements = this.buttonList.nativeElement.childNodes;
    const ulElementsAsArray: Element[] = Array.from(ulElements);
    this.navbarSelectorService.selectCurrentPageLink(ulElementsAsArray);
  }
}

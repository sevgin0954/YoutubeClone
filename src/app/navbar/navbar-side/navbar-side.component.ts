import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarSelectorService } from '../services/navbar-selector.service';

@Component({
  selector: 'app-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements AfterViewChecked {

  @ViewChild('buttonList') buttonList: ElementRef;

  constructor(
    private navbarSelectorService: NavbarSelectorService,
    private router: Router
  ) { }

  ngAfterViewChecked(): void {
    const ulElements = this.buttonList.nativeElement.childNodes;
    const ulElementsAsArray: Element[] = Array.from(ulElements);

    const url = this.router.url;

    this.navbarSelectorService.selectCurrentPageLink(ulElementsAsArray, url);
  }
}

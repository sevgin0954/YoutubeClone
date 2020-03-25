import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarSelectorService } from '../services/navbar-selector.service';

@Component({
  selector: 'app-navbar-menus',
  templateUrl: './navbar-menus.component.html',
  styleUrls: ['./navbar-menus.component.scss']
})
export class NavbarMenusComponent implements AfterViewChecked {

  @ViewChild('buttonList', {static: false}) buttonList: ElementRef;

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

import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarSelectorService } from '../services/navbar-selector.service';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss']
})
export class NavbarBottomComponent implements AfterViewChecked {

  @ViewChild('buttonList')
  buttonList: ElementRef;

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

import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { NavbarSelectorService } from '../services/navbar-selector.service';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.scss']
})
export class NavbarBottomComponent implements AfterViewChecked {

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

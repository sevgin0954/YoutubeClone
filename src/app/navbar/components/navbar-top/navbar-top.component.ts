import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MainConstants } from 'src/app/shared/constants/main-constants';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants/route-constants';


@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarTopComponent {

  constructor(
    private router: Router
  ) { }

  skipToMainContent(): void {
    const mainElement: HTMLElement = document
      .querySelector(`#${MainConstants.SKIP_TO_ELEMENT_ID}`);
    mainElement.focus();
  }

  onSubmit(query: string): void {
    this.router.navigate([`/${RouteConstants.SEARCH}`, query])
  }
}

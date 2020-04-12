import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MainConstants } from 'src/app/shared/Constants/main-constants';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarTopComponent {

  skipToMainContent(): void {
    const mainElement: HTMLElement = document
      .querySelector(`#${MainConstants.SKIP_TO_ELEMENT_ID}`);
    mainElement.focus();
  }
}

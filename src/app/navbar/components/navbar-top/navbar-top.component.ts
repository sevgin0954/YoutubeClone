import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MainConstants } from 'src/app/shared/constants/main-constants';
import { SearchService } from 'src/app/services-singleton/search.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';

const MAX_RESULTS_PER_PAGE = 25;

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarTopComponent {

  constructor(
    private search: SearchService
  ) { }

  skipToMainContent(): void {
    const mainElement: HTMLElement = document
      .querySelector(`#${MainConstants.SKIP_TO_ELEMENT_ID}`);
    mainElement.focus();
  }

  onSubmit(query: string): void {
    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE);
    this.search.getResults(query, pageArgs).subscribe(data => {
      console.log(data);
    });
  }
}

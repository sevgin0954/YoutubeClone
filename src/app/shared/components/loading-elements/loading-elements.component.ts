import { Component, HostListener, Input, ElementRef, ViewChild } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-loading-elements',
  templateUrl: './loading-elements.component.html',
  styleUrls: ['./loading-elements.component.scss']
})
export class LoadingElementsComponent {

  @isRequired
  @Input()
  isLoadingDisabled: boolean;

  @isRequired
  @Input()
  loadingCallback: Function;

  @ViewChild('loading')
  private loadingElement: ElementRef;

  constructor(
    private windowService: WindowService
  ) { }

  @HostListener("window:scroll")
  onScroll(): void {
    if (this.isLoadingDisabled) {
      return;
    }

    const loadingElement = this.loadingElement.nativeElement;

    if (loadingElement == null) {
      return;
    }

    const isLoadingVisible = this.windowService
      .isElementInsideTheScreenVerticaly(loadingElement);
    if (isLoadingVisible) {
      this.loadingCallback();
    }
  }
}

import { Component, ElementRef, ViewChild, TemplateRef, Input, HostListener, ContentChild, QueryList, ViewChildren } from '@angular/core';

import { ElementDisplayService } from '../../services-singleton/elements-display.service';
import { ArrowDisplayButtonService } from '../services/arrow-display-button.service';
import { WindowService } from 'src/app/services-singleton/window.service';
import { ArrowClickButtonService } from '../services/arrow-click-button.service';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';

@Component({
  selector: 'app-playlist-buttons',
  templateUrl: './playlist-buttons.component.html',
  styleUrls: ['./playlist-buttons.component.scss']
})
export class PlaylistButtonsComponent {

  @ContentChild('playlistElementTemplate', {static: false})
  playlistElementTemplateRef: TemplateRef<any>;

  @ViewChildren('element')
  playlistViewElements: QueryList<ElementRef>;

  @isRequired
  @isType('object')
  @Input()
  playlistElements: any[];

  @isRequired
  @isType('function')
  @Input()
  loadMoreCallBack: Function;

  @isRequired
  @isType('number')
  @Input()
  totalResultsCount: number;

  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChild('loadingBtn', { static: false }) loadingBtn: ElementRef;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;

  constructor(
    private playlistElementService: ElementDisplayService,
    private arrowDisplayButtonService: ArrowDisplayButtonService,
    private windowService: WindowService,
    private arrowClickButtonService: ArrowClickButtonService
  ) { }

  ngAfterViewChecked(): void {
    if (this.playlistViewElements.first && this.playlistViewElements.last) {
      this.updatePlaylistElementsHiddenAttribute();
      this.updateButtons();
    }
  }

  private updatePlaylistElementsHiddenAttribute(): void {
    const lastButton = this.getLastVisibleButton();

    let isRightBtnOverflowing = this.windowService.isElementOverflowingHorizontaly(lastButton.nativeElement);
    if (isRightBtnOverflowing) {
      const playlistNativeElements = this.playlistViewElements.map(e => e.nativeElement);
      this.playlistElementService
        .tryHideRightOverflowingElements(playlistNativeElements, lastButton.nativeElement);
    }
    else {
      this.showElements(lastButton);
    }
  }

  private showElements(lastButton: ElementRef): void {
    const playlistNativeElements = this.playlistViewElements.map(e => e.nativeElement);

    this.playlistElementService
      .tryShowRightHiddenElements(playlistNativeElements, lastButton.nativeElement);
    this.playlistElementService
      .tryShowLeftHiddenElements(playlistNativeElements, lastButton.nativeElement);
  }

  private getLastVisibleButton(): ElementRef {
    let lastButton = this.rightBtn;
    if (this.loadingBtn.nativeElement.hasAttribute('hidden') === false) {
      lastButton = this.loadingBtn;
    }

    return lastButton;
  }

  private updateButtons(): void {
    const isLastElementHidden = this.playlistViewElements.last.nativeElement.hasAttribute('hidden');
    this.arrowDisplayButtonService.updateRightButtonDisabledAttribute(
      this.rightBtn,
      isLastElementHidden,
      this.playlistViewElements.length,
      this.totalResultsCount
    );

    const isFirstElementHidden = this.playlistViewElements.first.nativeElement.hasAttribute('hidden');
    this.arrowDisplayButtonService.updateLeftButtonDisabledAttribute(this.leftBtn, isFirstElementHidden);
  }

  onLeftBtnClick(): void {
    const playlistElements: Element[] = this.playlistViewElements.map(e => e.nativeElement);
    this.arrowClickButtonService.onLeftBtnClick(playlistElements);
  }

  onRightBtnClick(): void {
    const playlistElements: Element[] = this.playlistViewElements.map(e => e.nativeElement);
    const loadMoreCallBack: Function = () => this.loadMoreCallBack(() => {
      this.playlistElementService.hideFirstShownElement(playlistElements);

      this.loadingBtn.nativeElement.setAttribute('hidden', 'hidden');
      this.rightBtn.nativeElement.removeAttribute('hidden');
    });

    this.arrowClickButtonService.onRightBtnClick(
      playlistElements,
      this.totalResultsCount,
      this.rightBtn.nativeElement,
      this.loadingBtn.nativeElement,
      loadMoreCallBack
    );
  }

  // Runs change detection on resize
  @HostListener('window:resize')
  private onWindowResize(): void { }
}

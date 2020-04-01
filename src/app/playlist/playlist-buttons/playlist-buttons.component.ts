import { Component, ElementRef, ViewChild, QueryList, ContentChildren, TemplateRef, Input, AfterViewChecked, ChangeDetectionStrategy, HostListener } from '@angular/core';

import { ElementDisplayService } from '../../services-singleton/elements-display.service';
import { ArrowDisplayButtonService } from '../services/arrow-display-button.service';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';
import { ArrowClickButtonService } from '../services/arrow-click-button.service';

@Component({
  selector: 'app-playlist-buttons',
  templateUrl: './playlist-buttons.component.html',
  styleUrls: ['./playlist-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistButtonsComponent implements AfterViewChecked {

  @ContentChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  @Input() loadMoreCallBack: Function;
  @Input() channelSection: ChannelSection[];
  @Input() itemTemplate: TemplateRef<HTMLElement>;
  @Input() totalResultsCount: number;
  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChild('loadingBtn', { static: false }) loadingBtn: ElementRef;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;

  constructor(
    private playlistElementService: ElementDisplayService,
    private arrowButtonService: ArrowDisplayButtonService,
    private windowService: WindowService,
    private arrowClickButtonService: ArrowClickButtonService
  ) { }
  ngDoCheck(): void {
    console.log('doChekc parent ')
  }

  ngAfterViewChecked(): void {
    if (this.playlistElements.first && this.playlistElements.last) {
      this.updatePlaylistElementsHiddenAttribute();
      this.updateButtons();
    }
  }

  private updatePlaylistElementsHiddenAttribute(): void {
    const lastButton = this.getLastVisibleButton();

    let isRightBtnOverflowing = this.windowService.isElementOverflowingHorizontaly(lastButton.nativeElement);
    if (isRightBtnOverflowing) {
      const playlistNativeElements = this.playlistElements.map(e => e.nativeElement);
      this.playlistElementService
        .tryHideRightOverflowingElements(playlistNativeElements, lastButton.nativeElement);
    }
    else {
      this.showElements(lastButton);
    }
  }

  private showElements(lastButton: ElementRef): void {
    const playlistNativeElements = this.playlistElements.map(e => e.nativeElement);

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
    const isLastElementHidden = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    this.arrowButtonService.updateRightButtonDisabledAttribute(
      this.rightBtn,
      isLastElementHidden,
      this.playlistElements.length,
      this.totalResultsCount
    );

    const isFirstElementHidden = this.playlistElements.first.nativeElement.hasAttribute('hidden');
    this.arrowButtonService.updateLeftButtonDisabledAttribute(this.leftBtn, isFirstElementHidden);
  }

  onLeftBtnClick(): void {
    const playlistElements: Element[] = this.playlistElements.map(e => e.nativeElement);
    this.arrowClickButtonService.onLeftBtnClick(playlistElements);
  }

  onRightBtnClick(): void {
    const playlistElements: Element[] = this.playlistElements.map(e => e.nativeElement);
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

  @HostListener('window:resize')
  private onWindowResize(): void { }
}

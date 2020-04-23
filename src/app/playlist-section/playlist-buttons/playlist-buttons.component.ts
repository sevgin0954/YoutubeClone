import { Component, ElementRef, ViewChild, TemplateRef, Input, ContentChild, QueryList, ViewChildren, AfterViewChecked, AfterViewInit } from '@angular/core';

import { WindowService } from 'src/app/services-singleton/window.service';
import isRequired from 'src/app/decorators/isRequired';
import { PlaylistElementService } from '../services/playlist-element.service';

@Component({
  selector: 'app-playlist-buttons',
  templateUrl: './playlist-buttons.component.html',
  styleUrls: ['./playlist-buttons.component.scss']
})
export class PlaylistButtonsComponent implements AfterViewInit, AfterViewChecked {

  @ContentChild('playlistElementTemplate')
  playlistElementTemplateRef: TemplateRef<any>;

  @ViewChildren('element')
  playlistViewElements: QueryList<ElementRef>;

  @isRequired
  @Input()
  playlistElements: any[];

  @isRequired
  @Input()
  loadMoreCallBack: Function;

  @isRequired
  @Input()
  totalResultsCount: number;

  @ViewChild('leftBtn') leftBtn: ElementRef;
  @ViewChild('loadingBtn') loadingBtn: ElementRef;
  @ViewChild('rightBtn') rightBtn: ElementRef;

  private htmlElement: Element;
  private resizeSubscription: any;

  constructor(
    private playlistElementService: PlaylistElementService,
    private windowService: WindowService,
  ) { }

  ngAfterViewInit(): void {
    this.setupOnWindowResizeEvent();
  }

  private setupOnWindowResizeEvent(): void {
    // @ts-ignore
    this.resizeSubscription = new ResizeObserver(subscribers => {
      this.onWindowResize();
    });

    this.htmlElement = document.querySelector('html');
    this.resizeSubscription.observe(this.htmlElement);
  }

  ngAfterViewChecked(): void {
    this.update();
  }

  private onWindowResize(): void {
    this.update();
  }

  private update(): void {
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
    const lastShownElement = lastButton.nativeElement;

    const areElementsFromRightShown = this.playlistElementService
      .tryShowFirstHiddenElementsFromRightUntilOverflow(playlistNativeElements, lastShownElement);
    const areElementsFromLeftShown = this.playlistElementService
      .tryShowLastHiddenElementsFromLeftUntilOverflow(playlistNativeElements, lastShownElement);
    if (areElementsFromRightShown === false && areElementsFromLeftShown === false) {
      this.playlistElementService
        .tryShowHiddenElementsFromBeginingUntilOverflow(playlistNativeElements, lastShownElement);
    }
  }

  private getLastVisibleButton(): ElementRef {
    let lastButton = this.rightBtn;
    if (this.loadingBtn.nativeElement.hasAttribute('hidden') === false) {
      lastButton = this.loadingBtn;
    }

    return lastButton;
  }

  private updateButtons(): void {
    this.updateRightDisabledButton();
    this.updateLeftDisabledButton();
  }

  private updateRightDisabledButton(): void {
    const lastElement = this.playlistViewElements.last;
    const isLastElementHidden = lastElement.nativeElement.hasAttribute('hidden');
    if (isLastElementHidden || this.playlistViewElements.length < this.totalResultsCount) {
      this.rightBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      this.rightBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  private updateLeftDisabledButton(): void {
    const firstElement = this.playlistViewElements.first;
    const isFirstElementHidden = firstElement.nativeElement.hasAttribute('hidden');
    if (isFirstElementHidden) {
      this.leftBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      this.leftBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  onLeftBtnClick(): void {
    const playlistElements: Element[] = this.playlistViewElements.map(e => e.nativeElement);
    this.playlistElementService.showLastHiddenElementFromLeft(playlistElements);
  }

  onRightBtnClick(): void {
    const playlistElements: Element[] = this.playlistViewElements.map(e => e.nativeElement);
    const loadMoreCallBack: Function = () => this.loadMoreCallBack(() => {
      this.playlistElementService.hideFirstShownElement(playlistElements);

      this.hideLoadingButton();
    });

    const lastElement = playlistElements[playlistElements.length - 1];
    if (this.canLoadMore(lastElement, playlistElements)) {
      this.showLoadingButton();

      loadMoreCallBack();
    }
    else {
      this.playlistElementService.showFirstHiddenElementFromRight(playlistElements);
      this.playlistElementService.hideFirstShownElement(playlistElements);
    }
  }

  private canLoadMore(
    lastElement: Element,
    playlistElements: Element[]
  ): boolean {
    const isLastElementHidden = lastElement.hasAttribute('hidden') === false;
    const areMoreElementToLoad = playlistElements.length < this.totalResultsCount;

    return isLastElementHidden && areMoreElementToLoad;
  }

  private showLoadingButton(): void {
    this.loadingBtn.nativeElement.removeAttribute('hidden');
    this.rightBtn.nativeElement.setAttribute('hidden', 'hidden');
  }

  private hideLoadingButton(): void {
    this.loadingBtn.nativeElement.setAttribute('hidden', 'hidden');
    this.rightBtn.nativeElement.removeAttribute('hidden');
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unobserve(this.htmlElement);
  }
}

import { Injectable, ChangeDetectorRef } from '@angular/core';

import { PlaylistElementService } from './playlist-element.service';

@Injectable()
export class ArrowClickButtonService {

  constructor(
    private playlistElementService: PlaylistElementService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  onLeftBtnClick(playlistElements: Element[]): void {
    this.playlistElementService.showLastHiddenElementFromLeft(playlistElements);

    this.changeDetectorRef.markForCheck();
  }

  onRightBtnClick(
    playlistElements: Element[],
    totalResultsCount: number,
    rightBtn: Element,
    loadMoreCallBack: Function
  ): void {
    const lastElement = playlistElements[playlistElements.length - 1];
    if (this.canLoadMore(lastElement, playlistElements, totalResultsCount)) {
      rightBtn.setAttribute('hidden', 'hidden');

      loadMoreCallBack();
    }
    else {
      this.playlistElementService.hideFirstHiddenElementFromRight(playlistElements);
      this.playlistElementService.hideFirstShownElement(playlistElements);
    }
  }

  private canLoadMore(
    lastElement: Element,
    playlistElements: Element[],
    totalResultsCount: number
  ): boolean {
    const isLastElementHidden = lastElement.hasAttribute('hidden') === false;
    const areMoreElementToLoad = playlistElements.length < totalResultsCount;

    return isLastElementHidden && areMoreElementToLoad;
  }
}

import { Injectable } from '@angular/core';

import { PlaylistElementService } from './playlist-element.service';

@Injectable()
export class ArrowClickButtonService {

  constructor(
    private playlistElementService: PlaylistElementService
  ) { }

  onLeftBtnClick(playlistElements: Element[]): void {
    this.playlistElementService.showLastHiddenElementFromLeft(playlistElements);
  }

  onRightBtnClick(
    playlistElements: Element[],
    totalResultsCount: number,
    rightBtn: Element,
    loadingBtn: Element,
    loadMoreCallBack: Function
  ): void {
    const lastElement = playlistElements[playlistElements.length - 1];
    if (this.canLoadMore(lastElement, playlistElements, totalResultsCount)) {
      rightBtn.setAttribute('hidden', 'hidden');
      loadingBtn.removeAttribute('hidden');

      loadMoreCallBack();
    }
    else {
      this.playlistElementService.showFirstHiddenElementFromRight(playlistElements);
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
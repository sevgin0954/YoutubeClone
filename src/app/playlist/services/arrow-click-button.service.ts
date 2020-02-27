import { Injectable, ChangeDetectorRef } from '@angular/core';

import { ElementDisplayService } from '../../services-singleton/elements-display.service';

@Injectable()
export class ArrowClickButtonService {

  constructor(
    private playlistElementService: ElementDisplayService
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

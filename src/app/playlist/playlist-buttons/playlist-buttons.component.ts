import { Component, ElementRef, ViewChild, QueryList, HostListener, AfterContentChecked, ContentChildren, ContentChild } from '@angular/core';

import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';
import { PlaylistElementService } from '../services/playlist-element.service';
import { ArrowButtonService } from '../services/arrow-button.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-playlist-buttons',
  templateUrl: './playlist-buttons.component.html',
  styleUrls: ['./playlist-buttons.component.scss']
})
export class PlaylistButtonsComponent implements AfterContentChecked {

  loadMorePlaylists: Subject<Function>;
  @ContentChild('playlist', { static: false }) playlist: ElementRef;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;
  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChild('loadingBtn', { static: false }) loadingBtn: ElementRef;
  @ContentChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  totalResultsCount: number = 6;

  constructor(
    private elementsPredicateService: ElementsPredicateService,
    private playlistElementService: PlaylistElementService,
    private arrowButtonService: ArrowButtonService
  ) { }

  ngAfterContentChecked(): void {
    if (this.playlistElements.first && this.playlistElements.last) {
      const isFirstElementHidden = this.playlistElements.first.nativeElement.hasAttribute('hidden');
      if (isFirstElementHidden) {
        this.updateLeftElementHiddenAttribute();
      }

      const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
      this.arrowButtonService.updateRightButtonDisabledAttribute(
        this.rightBtn,
        areThereHiddenElements,
        this.playlistElements.length,
        this.totalResultsCount
      );

      this.arrowButtonService.updateLeftButtonDisabledAttribute(this.leftBtn, isFirstElementHidden);
    }
  }

  onLeftBtnClick(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = this.playlist.nativeElement.children;
    const lastHiddenElementFromLeft =
      this.getFirstElement(playlistElements, this.elementsPredicateService.getLastHiddenElementFromLeft);
    lastHiddenElementFromLeft.removeAttribute('hidden');
  }

  onRightBtnClick(playlist: HTMLElement): void {
    const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    if (areThereHiddenElements === false && this.playlistElements.length < this.totalResultsCount) {
      this.rightBtn.nativeElement.setAttribute('hidden', 'hidden');
      this.loadingBtn.nativeElement.removeAttribute('hidden');

      this.loadMorePlaylists.next(value => {
        return this.playlistElementService.hideFirstShownElement(this.playlist.nativeElement);
      });
      // this.playlistChild.nativeElement.loadMoreVideos(() => {
      //   this.playlistElementService.hideFirstShownElement(this.playlist.nativeElement);
      // });
    }
    else {
      this.playlistElementService.hideFirstShownElement(this.playlist.nativeElement);
    }
  }

  private getFirstElement(
    elements: HTMLCollection,
    predicate: (element: Element, index: number, elements: Element[]) => boolean
  ): Element {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element;
  }

  updateLeftElementHiddenAttribute() {
    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        this.playlistElements
          .map(e => e.nativeElement)
          .find(this.elementsPredicateService.getLastHiddenElementFromLeft);
      const lastShownElement =
        this.playlistElements
          .map(e => e.nativeElement)
          .find(this.elementsPredicateService.getLastShownElement);
      if (lastHiddenElementFromLeft && lastShownElement) {
        const isElementShown =
          this.playlistElementService.tryShowElement(lastHiddenElementFromLeft, lastShownElement);
        isThereMoreSpace = isElementShown;
      }
      else {
        isThereMoreSpace = false;
      }
    }
  }

  @HostListener('totalResultsCount', ['$event'])
  setTotalResultsCount(count: number): void {
    this.totalResultsCount = count;
  }
}

import { Component, ElementRef, ViewChild, QueryList, ContentChildren, ContentChild, TemplateRef, Input, AfterViewChecked } from '@angular/core';

import { PlaylistElementService } from '../services/playlist-element.service';
import { ArrowButtonService } from '../services/arrow-button.service';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ElementsPredicateService } from 'src/app/services-singleton/elements-predicate.service';

@Component({
  selector: 'app-playlist-buttons',
  templateUrl: './playlist-buttons.component.html',
  styleUrls: ['./playlist-buttons.component.scss']
})
export class PlaylistButtonsComponent implements AfterViewChecked {

  // TODO: Get as input
  @ContentChild('playlist', { static: false }) playlist: ElementRef;
  @ContentChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  @Input() loadMoreCallBack: Function;
  @Input() channelSection: ChannelSection[];
  @Input() itemTemplate: TemplateRef<HTMLElement>;
  @Input() totalResultsCount: number;
  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChild('loadingBtn', { static: false }) loadingBtn: ElementRef;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;

  constructor(
    private elementsPredicateService: ElementsPredicateService,
    private playlistElementService: PlaylistElementService,
    private arrowButtonService: ArrowButtonService
  ) { }

  ngAfterViewChecked(): void {
    if (this.playlistElements.first && this.playlistElements.last) {
      const isFirstElementHidden = this.playlistElements.first.nativeElement.hasAttribute('hidden');

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

  onLeftBtnClick(): void {
    const playlistElements: HTMLCollection = this.playlist.nativeElement.children;
    const lastHiddenElementFromLeft: HTMLElement =
      this.getFirstHtmlElement(
        playlistElements, this.elementsPredicateService.getLastHiddenElementFromLeft
      );
    lastHiddenElementFromLeft.removeAttribute('hidden');
  }

  private getFirstHtmlElement(
    elements: HTMLCollection,
    predicate: (element: Element, index: number, elements: Element[]) => boolean
  ): HTMLElement {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element as HTMLElement;
  }

  onRightBtnClick(): void {
    const playlistElements: HTMLCollection = this.playlist.nativeElement.children;
    const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    if (areThereHiddenElements === false && this.playlistElements.length < this.totalResultsCount) {
      this.rightBtn.nativeElement.setAttribute('hidden', 'hidden');
      this.loadingBtn.nativeElement.removeAttribute('hidden');

      this.loadMoreCallBack(() => {
        this.playlistElementService.hideFirstShownElement(playlistElements);

        this.loadingBtn.nativeElement.setAttribute('hidden', 'hidden');
        this.rightBtn.nativeElement.removeAttribute('hidden');
      });
    }
    else {
      this.playlistElementService.hideFirstShownElement(playlistElements);
    }
  }
}

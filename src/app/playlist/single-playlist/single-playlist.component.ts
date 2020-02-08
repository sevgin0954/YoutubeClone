import {
  Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewChecked, OnInit,
} from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';

const MAX_PLAYLIST_ITEM_RESULTS = 5;

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlaylistComponent implements OnInit, AfterViewChecked {

  @Input() private channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;
  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChild('loadingBtn', { static: false }) loadingBtn: ElementRef;
  @ViewChildren('playlistElement') set setPlaylistElements(items: QueryList<ElementRef>) {
    this.playlistElements = items;
  };
  videos: Video[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = 35;
  private playlistElements: QueryList<ElementRef>;
  private nextPageToken: string;
  private isFirstPage: boolean = true;
  private totalResults: number;

  constructor(
    public windowService: WindowService,
    private playlistService: PlaylistService,
    private videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  private loadMoreVideos(callback): void {
    if (this.isFirstPage === false && this.nextPageToken === undefined) {
      return;
    }

    this.isFirstPage = false;

    const playlistId = this.channelSection.contentDetails.playlists[0];
    this.playlistService.getById(playlistId, MAX_PLAYLIST_ITEM_RESULTS, this.nextPageToken).pipe(
      concatMap(data => {
        const videoIds = data.items.map(item => item.contentDetails.videoId);
        this.nextPageToken = data.nextPageToken;
        this.totalResults = data.pageInfo.totalResults;

        return this.videoService.getByIds(...videoIds);
      })
    ).subscribe(videos => {
      this.videos.push(...videos);

      callback();

      this.loadingBtn.nativeElement.setAttribute('hidden', 'hidden');
      this.rightBtn.nativeElement.removeAttribute('hidden');

      this.changeDetectorRef.markForCheck();
    });
  }

  ngAfterViewChecked(): void {
    if (this.playlistElements.first && this.playlistElements.last) {
      const isFirstElementHidden = this.playlistElements.first.nativeElement.hasAttribute('hidden');
      if (isFirstElementHidden) {
        this.updateLeftElementHiddenAttribute();
      }

      this.updateRightArrowButtonDisabledAttribute();
      this.updateLeftArrowButtonDisabledAttribute();
    }
  }

  updateLeftElementHiddenAttribute() {
    let isThereMoreSpace = true;
    while (isThereMoreSpace) {
      const lastHiddenElementFromLeft =
        this.playlistElements.map(e => e.nativeElement).find(this.getLastHiddenElementFromLeft);
      const lastShownElement =
        this.playlistElements.map(e => e.nativeElement).find(this.getLastShownElement);
      if (lastHiddenElementFromLeft && lastShownElement) {
        const isElementShown =
          this.tryShowPlaylistElement(lastHiddenElementFromLeft, lastShownElement);
        isThereMoreSpace = isElementShown;
      }
      else {
        isThereMoreSpace = false;
      }
    }
  }

  tryShowPlaylistElement(elementToShow, lastShownElement): boolean {
    let isElementShown = true;

    elementToShow.removeAttribute('hidden');
    const isLastElementOverflowing = this.windowService.isElementOverflowing(lastShownElement);
    if (isLastElementOverflowing) {
      elementToShow.setAttribute('hidden', 'hidden');
      isElementShown = false;
    }

    return isElementShown;
  }

  private updateRightArrowButtonDisabledAttribute(): void {
    const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    if (areThereHiddenElements || this.videos.length < this.totalResults) {
      this.rightBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      this.rightBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  private updateLeftArrowButtonDisabledAttribute(): void {
    if (this.playlistElements.first.nativeElement.hasAttribute('hidden')) {
      this.leftBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      this.leftBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  onPlaylistResize(): void {
    this.changeDetectorRef.markForCheck();
  }

  onLeftBtnClick(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = playlist.children;
    const lastHiddenElementFromLeft =
      this.getFirstElement(playlistElements, this.getLastHiddenElementFromLeft);
    lastHiddenElementFromLeft.removeAttribute('hidden');
  }

  private getLastHiddenElementFromLeft(element: Element, index: number, elements: Element[]): boolean {
    const isCurrentElementHidden = elements[index].hasAttribute('hidden');
    let isNextElementVisible = true;
    const nextIndex = index + 1;
    if (nextIndex < elements.length) {
      isNextElementVisible = elements[nextIndex].hasAttribute('hidden') === false
    }

    return isCurrentElementHidden && isNextElementVisible;
  }

  onRightBtnClick(playlist: HTMLElement): void {
    const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    if (areThereHiddenElements === false && this.videos.length < this.totalResults) {
      this.rightBtn.nativeElement.setAttribute('hidden', 'hidden');
      this.loadingBtn.nativeElement.removeAttribute('hidden');

      this.loadMoreVideos(() => {
        this.hideFirstShownElement(playlist);
      });
    }
    else {
      this.hideFirstShownElement(playlist);
    }
  }

  private hideFirstShownElement(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = playlist.children;
    const firstShownElement = this.getFirstElement(playlistElements, this.getFirstShownElement);
    firstShownElement.setAttribute('hidden', 'hidden');
  }

  private getFirstShownElement(element: Element, index: number, elements: Element[]): boolean {
    let isPreviousElementHidden = true;
    if (index > 0) {
      isPreviousElementHidden = elements[index - 1].hasAttribute('hidden');
    }
    const isCurrentElementVisible = elements[index].hasAttribute('hidden') === false;

    return isPreviousElementHidden && isCurrentElementVisible;
  }

  private getLastShownElement(element: Element, index: number, elements: Element[]): boolean {
    const isCurrentElementShown = element.hasAttribute('hidden') === false;
    let isNextElementHidden = true;

    const nextElementIndex = index + 1;
    if (nextElementIndex < elements.length) {
      isNextElementHidden = elements[nextElementIndex].hasAttribute('hidden');
    }

    return isCurrentElementShown && isNextElementHidden;
  }

  private getFirstElement(
    elements: HTMLCollection,
    predicate: (element: Element, index: number, elements: Element[]) => boolean
  ): Element {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element;
  }
}

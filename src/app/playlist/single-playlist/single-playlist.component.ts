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
  @ViewChildren('playlistElement') set setPlaylistElements(items: QueryList<ElementRef>) {
    this.playlistElements = items;
  };
  videos: Video[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = 35;
  private playlistElements: QueryList<ElementRef>;
  private nextPageToken: string;
  private isFirstPage: boolean = true;

  constructor(
    private playlistService: PlaylistService,
    private videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadMoreVideos();
  }

  private loadMoreVideos(): void {
    if (this.isFirstPage === false && this.nextPageToken === undefined) {
      return;
    }

    const playlistId = this.channelSection.contentDetails.playlists[0];
    this.playlistService.getById(playlistId, MAX_PLAYLIST_ITEM_RESULTS, this.nextPageToken).pipe(
      concatMap(data => {
        const videoIds = data.items.map(item => item.contentDetails.videoId);
        this.nextPageToken = data.nextPageToken;

        return this.videoService.getByIds(...videoIds);
      })
    ).subscribe(videos => {
      this.videos.push(...videos);

      this.changeDetectorRef.markForCheck();
    });

    this.isFirstPage = false;
  }

  ngAfterViewChecked(): void {
    if (this.playlistElements.last) {
      const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
      if (areThereHiddenElements === false) {
        this.rightBtn.nativeElement.setAttribute('disabled', 'disabled');
      }
      else {
        this.rightBtn.nativeElement.removeAttribute('disabled');
      }
    }
  }

  onPlaylistResize(): void {
    this.changeDetectorRef.markForCheck();
  }

  isElementOverflowing(element): boolean {
    let isOverflowing = false;

    let rect: DOMRect = element.getBoundingClientRect();
    if (rect.right === 0) {
      element.removeAttribute('hidden');

      rect = element.getBoundingClientRect();
      isOverflowing = this.isElementOverflowing(element);

      element.setAttribute('hidden', 'hidden');
    }
    else if (rect.right + 90 > window.screen.width) {
      isOverflowing = true;
    }

    return isOverflowing;
  }

  onLeftBtnClick(playlist): void {
    const playlistElements: HTMLCollection = playlist.children;
    const lastHiddenElementFromLeftPredicate = (element: Element, index: number) => {
      const isCurrentElementHidden = playlistElements[index].hasAttribute('hidden');
      let isNextElementVisible = true;
      if (index < playlistElements.length) {
        isNextElementVisible = playlistElements[index + 1].hasAttribute('hidden') === false
      }

      return isCurrentElementHidden && isNextElementVisible;
    };
    const lastHiddenElementFromLeft =
      this.getFirstElement(playlistElements, lastHiddenElementFromLeftPredicate);

    lastHiddenElementFromLeft.removeAttribute('hidden');

    if (this.playlistElements.first.nativeElement.hasAttribute('hidden') === false) {
      this.leftBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  onRightBtnClick(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = playlist.children;
    const firstShownElementPredicate = (element: Element, index: number) => {
      let isPreviousElementHidden = true;
      if (index > 0) {
        isPreviousElementHidden = playlistElements[index - 1].hasAttribute('hidden');
      }
      const isCurrentElementVisible = playlistElements[index].hasAttribute('hidden') === false;

      return isPreviousElementHidden && isCurrentElementVisible;
    };
    const firstShownElement = this.getFirstElement(playlistElements, firstShownElementPredicate);

    firstShownElement.setAttribute('hidden', 'hidden');

    this.leftBtn.nativeElement.removeAttribute('disabled');
  }

  private getFirstElement(
    elements: HTMLCollection,
    predicate: (element: Element, index: number) => boolean
  ): Element {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element;
  }
}

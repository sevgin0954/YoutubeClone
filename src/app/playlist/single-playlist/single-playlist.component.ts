import {
  Component, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit,
} from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { Observable } from 'rxjs';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlaylistComponent implements OnChanges, AfterViewInit {

  @Input() private channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;
  @ViewChild('leftBtn', { static: false }) leftBtn: ElementRef;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  videos$: Observable<Video[]>;
  shouldShowVideo: boolean[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = 35;
  shouldShowArrowButtons: boolean;

  constructor(
    private playlistService: PlaylistService,
    private videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    this.initVideos();

    const sectionStyle = this.channelSection.snippet.style;
    this.shouldShowArrowButtons =
      ChannelSectionStyle[sectionStyle] === ChannelSectionStyle.horizontalRow;
  }

  ngAfterViewInit(): void {
    this.leftBtn.nativeElement.setAttribute('disabled', 'disabled');

    const areThereHiddenElements = this.playlistElements.last.nativeElement.hasAttribute('hidden');
    if (areThereHiddenElements) {
      this.rightBtn.nativeElement.setAttribute('disabled', 'disabled')
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

  initVideos(): void {
    const playlistId = this.channelSection.contentDetails.playlists[0];
    this.videos$ = this.playlistService.getById(playlistId).pipe(
      concatMap(playlistItems => {
        const videoIds = playlistItems.map(item => item.contentDetails.videoId)

        return this.videoService.getByIds(...videoIds);
      })
    );
  }

  onLeftBtnClick(playlist): void {
    const playlistElements: HTMLCollection = playlist.children;
    const firstHiddenElement =
      this.getFirstElement(playlistElements, e => e.hasAttribute('hidden'));
    const lastNotHiddenElement =
      this.getLastElement(playlistElements, e => e.hasAttribute('hidden') === false);

    lastNotHiddenElement.setAttribute('hidden', 'hidden');
    firstHiddenElement.removeAttribute('hidden');
  }

  onRightBtnClick(playlist: HTMLElement): void {
    const playlistElements: HTMLCollection = playlist.children;
    const firstNotHiddenElement =
      this.getFirstElement(playlistElements, e => e.hasAttribute('hidden') === false);
    const lastHiddenElement =
      this.getLastElement(playlistElements, e => e.hasAttribute('hidden'));

    firstNotHiddenElement.setAttribute('hidden', 'hidden');
    lastHiddenElement.removeAttribute('hidden');
  }

  private getFirstElement(elements: HTMLCollection, predicate: (element: Element) => boolean): Element {
    const elementsAsArray = Array.from(elements);
    const element = elementsAsArray.find(predicate);

    return element;
  }

  private getLastElement(elements: HTMLCollection, predicate: (element: Element) => boolean): Element {
    let element: Element;

    for (let i = elements.length - 1; i >= 0; i--) {
      const currentElement = elements.item(i);
      if (predicate(currentElement)) {
        element = currentElement;
        break;
      }
    }

    return element;
  }
}

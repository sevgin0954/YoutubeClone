import { Component, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

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
export class SinglePlaylistComponent implements OnChanges {

  @Input() private channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  videos$: Observable<Video[]>;
  shouldShowVideo: boolean[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = 35;
  shouldShowArrowButtons: boolean;
  private playlistCounter: number = 0;

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
    }
    else if (rect.right + 90 > window.screen.width) {
      isOverflowing = true;
    }

    if (isOverflowing) {
      element.setAttribute('hidden', 'hidden');
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
}

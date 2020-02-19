import {
  Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ElementRef, ViewChild, ViewChildren, QueryList,
} from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { PlaylistItemsService } from 'src/app/services-singleton/playlist-items.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';
import { Constants } from 'src/app/shared/constants';
import { PlaylistElementService } from '../services/playlist-element.service';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlaylistComponent implements OnInit {

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;
  callBack: Function = (callback: Function) => this.loadMoreVideos(callback);
  totalResultsCount: number;
  videos: Video[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = 35;
  private isFirstPage: boolean = true;
  private nextPageToken: string;

  constructor(
    private playlistService: PlaylistItemsService,
    private playlistElementService: PlaylistElementService,
    private videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef,
    public windowService: WindowService
  ) { }

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  loadMoreVideos(callback: Function): void {
    if (this.isFirstPage === false && this.nextPageToken === undefined) {
      return;
    }

    this.isFirstPage = false;

    const playlistId = this.channelSection.contentDetails.playlists[0];
    const maxResults = Constants.MAX_PLAYLIST_ITEM_RESULTS;
    this.playlistService.getById(playlistId, maxResults, this.nextPageToken).pipe(
      concatMap(data => {
        const videoIds = data.items.map(item => item.contentDetails.videoId);
        this.nextPageToken = data.nextPageToken;
        this.totalResultsCount = data.pageInfo.totalResults;

        return this.videoService.getByIds(...videoIds);
      })
    ).subscribe(videos => {
      this.videos.push(...videos);

      callback();

      this.changeDetectorRef.markForCheck();
    });
  }

  onPlaylistResize(): void {
    const playlistNativeElements = this.playlistElements.map(e => e.nativeElement);
    this.playlistElementService.tryShowLeftHiddenElements(playlistNativeElements);

    this.changeDetectorRef.markForCheck();
  }
}
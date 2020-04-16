import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { PlaylistItemsService } from 'src/app/playlist/services/playlist-items.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistItemResource } from 'src/app/shared/enums/resource-properties/playlist-item-resource';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';
import isRequired from 'src/app/decorators/isRequired';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistService } from '../services/playlist.service';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';
import { Subscription, Observable } from 'rxjs';
import { Channel } from 'src/app/models/channel/channel';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';

@Component({
  selector: 'app-single-playlist-section',
  templateUrl: './single-playlist-section.component.html',
  styleUrls: ['./single-playlist-section.component.scss']
})
export class SinglePlaylistSectionComponent implements OnInit, OnDestroy {

  @isRequired
  @Input()
  playlistId: string;

  @isRequired
  @Input()
  style: ChannelSectionStyle;

  @ViewChild('rightBtn')
  rightBtn: ElementRef;

  channel: Channel;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMoreVideos(onLoadedMoreCallback);
  playlist: Playlist;
  totalResultsCount: number;
  titleMaxDisplayedRows: number = 2;
  videos: Video[] = [];
  videoSize: ThumbnailSize = ThumbnailSize.medium;
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private subscription: Subscription;

  constructor(
    private channelService: ChannelService,
    private playlistService: PlaylistService,
    private playlistItemsService: PlaylistItemsService,
    private thumbnailService: ThumbnailsService,
    private videoService: VideoService,
  ) { }

  ngOnInit(): void {
    this.initPlaylistAndChannel();
    this.loadMoreVideos(() => { });
  }

  initPlaylistAndChannel(): void {
    const resources = [
      PlaylistResource.snippet
    ];
    this.subscription = this.playlistService.getById(this.playlistId, resources).pipe(
      concatMap(playlist => {
        this.playlist = playlist;

        const resources = [
          ChannelResource.snippet
        ];
        return this.channelService.getById(playlist.snippet.channelId, resources);
      })
    ).subscribe(channel => {
      this.channel = channel;
    });
  }

  loadMoreVideos(onLoadedMoreCallback: Function): void {
    if (this.isFirstPage === false && this.nextPageToken === undefined) {
      return;
    }

    this.isFirstPage = false;

    const maxResults = MainConstants.MAX_PLAYLIST_ITEM_RESULTS;
    const pageArgs = new PageArguments(maxResults, this.nextPageToken);
    const resources = [
      PlaylistItemResource.snippet,
      PlaylistItemResource.contentDetails
    ];
    this.playlistItemsService.getById(this.playlistId, pageArgs, resources).pipe(
      concatMap(data => {
        const videoIds = data.items.map(item => item.contentDetails.videoId);
        this.nextPageToken = data.nextPageToken;
        this.totalResultsCount = data.pageInfo.totalResults;

        const resources = [
          VideoResource.contentDetails,
          VideoResource.snippet,
          VideoResource.statistics
        ];
        return this.videoService.getByIds(videoIds, resources);
      })
    ).subscribe(videos => {
      const currentPageVideosCount = videos.length;

      // TODO: Move to a service
      let currentPageExpectedVideosCount;
      const notLoadedVideosCount = pageArgs.maxResults - videos.length;
      if (pageArgs.maxResults > notLoadedVideosCount) {
        currentPageExpectedVideosCount = notLoadedVideosCount;
      }
      else {
        currentPageExpectedVideosCount = currentPageVideosCount - pageArgs.maxResults;
      }

      const missingVideosCount = currentPageExpectedVideosCount - currentPageVideosCount;
      this.totalResultsCount -= missingVideosCount;

      this.videos.push(...videos);

      onLoadedMoreCallback();
    });
  }

  getThumbnailUrl(): string {
    const thumbnailUrl = this.thumbnailService
      .getThumbnailUrl(ThumbnailSize.default, this.channel.snippet.thumbnails);

    return thumbnailUrl;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

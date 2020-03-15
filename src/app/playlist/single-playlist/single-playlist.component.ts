import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { PlaylistItemsService } from 'src/app/services-singleton/playlist-items.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistItemResource } from 'src/app/shared/enums/resource-properties/playlist-item-resource';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss']
})
export class SinglePlaylistComponent implements OnInit {

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChild('rightBtn', { static: false }) rightBtn: ElementRef;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMoreVideos(onLoadedMoreCallback);
  totalResultsCount: number;
  videos: Video[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  titleMaxDisplayedRows: number = 2;
  private isFirstPage: boolean = true;
  private nextPageToken: string;

  constructor(
    private playlistService: PlaylistItemsService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  loadMoreVideos(onLoadedMoreCallback: Function): void {
    if (this.isFirstPage === false && this.nextPageToken === undefined) {
      return;
    }

    this.isFirstPage = false;

    const playlistId = this.channelSection.contentDetails.playlists[0];
    const maxResults = MainConstants.MAX_PLAYLIST_ITEM_RESULTS;
    const pageArgs = new PageArguments(maxResults, this.nextPageToken);
    const resources = [
      PlaylistItemResource.snippet,
      PlaylistItemResource.contentDetails
    ];
    this.playlistService.getById(playlistId, pageArgs, resources).pipe(
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
}

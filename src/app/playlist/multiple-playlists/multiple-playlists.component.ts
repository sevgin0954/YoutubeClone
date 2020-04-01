import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { PlaylistsService } from 'src/app/playlist/services/playlists.service';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';

const MAX_RESULTS_PER_PAGE = 5;

@Component({
  selector: 'app-multiple-playlists',
  templateUrl: './multiple-playlists.component.html',
  styleUrls: ['./multiple-playlists.component.scss']
})
export class MultiplePlaylistsComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMorePlaylists(onLoadedMoreCallback);
  playlists: Playlist[] = [];
  thumbnailSize: string = VideoThumbnailSize[VideoThumbnailSize.default];
  totalResultsCount: number;
  private nextPageToken: string;
  private playlistsStartIndex: number = 0;
  private subscription: Subscription;

  constructor(
    private playlistsService: PlaylistsService,
    private thumbnailService: ThumbnailsService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }
  ngDoCheck(): void {
    console.log('doChekc child multiple playlists')
  }

  getThumnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailService.getThumbnailUrl(VideoThumbnailSize.default, thumbnails);

    return url;
  }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detach();
  }

  ngOnInit() {
    this.loadMorePlaylists(() => { });
  }

  loadMorePlaylists(onLoadedMoreCallback: Function): void {
    const playlistIds = this.channelSection.contentDetails.playlists;

    this.totalResultsCount = playlistIds.length;

    const playlistsEndIndex = this.playlistsStartIndex + MainConstants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = playlistIds.slice(this.playlistsStartIndex, playlistsEndIndex);
    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE, this.nextPageToken);
    const resources = [
      PlaylistResource.snippet,
      PlaylistResource.contentDetails
    ];

    this.subscription = this.playlistsService.getByIds(currentPagePlaylistIds, pageArgs, resources)
      .subscribe(data => {
      this.nextPageToken = data.nextPageToken;
      this.playlists.push(...data.items);

      this.playlistsStartIndex = playlistsEndIndex;

      onLoadedMoreCallback();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

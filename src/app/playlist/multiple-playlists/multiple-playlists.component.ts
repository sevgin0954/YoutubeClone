import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { PlaylistsService } from 'src/app/services-singleton/playlists.service';
import { Constants } from 'src/app/shared/constants';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistElementService } from '../services/playlist-element.service';
import { BasePlaylistComponent } from '../base-playlist-component';

@Component({
  selector: 'app-multiple-playlists',
  templateUrl: './multiple-playlists.component.html',
  styleUrls: ['./multiple-playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplePlaylistsComponent extends BasePlaylistComponent implements OnInit, OnDestroy {

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMorePlaylists(onLoadedMoreCallback);
  playlists: Playlist[] = [];
  thumbnailSize: string;
  totalResultsCount: number;
  private nextPageToken: string;
  private subscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    playlistElementService: PlaylistElementService,
    private playlistService: PlaylistsService
  ) {
    super(playlistElementService, changeDetectorRef);

    this.thumbnailSize = VideoThumbnailSize[VideoThumbnailSize.default];
  }

  ngOnInit() {
    this.loadMorePlaylists(() => { });
  }

  loadMorePlaylists(onLoadedMoreCallback: Function): void {
    const playlistIds = this.channelSection.contentDetails.playlists;
    const maxResults = Constants.MAX_PLAYLIST_ITEM_RESULTS;
    this.subscription = this.playlistService.getByIds(playlistIds, this.nextPageToken, maxResults)
      .subscribe(data => {
      this.nextPageToken = data.nextPageToken;
      this.totalResultsCount = data.pageInfo.totalResults;
      this.playlists.push(...data.items);

      onLoadedMoreCallback();

      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

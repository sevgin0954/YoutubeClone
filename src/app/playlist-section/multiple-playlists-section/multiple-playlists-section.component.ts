import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';
import isRequired from 'src/app/decorators/isRequired';

const MAX_RESULTS_PER_PAGE = 5;

@Component({
  selector: 'app-multiple-playlists-section',
  templateUrl: './multiple-playlists-section.component.html',
  styleUrls: ['./multiple-playlists-section.component.scss']
})
export class MultiplePlaylistsSectionComponent implements OnInit, OnDestroy {

  @isRequired
  @Input()
  channelSection: ChannelSection;

  @isRequired
  @Input()
  style: ChannelSectionStyle;

  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMorePlaylists(onLoadedMoreCallback);
  playlists: Playlist[] = [];
  thumbnailSize: string = ThumbnailSize[ThumbnailSize.default];
  totalResultsCount: number;
  private nextPageToken: string;
  private playlistsStartIndex: number = 0;
  private subscription: Subscription;

  constructor(
    private playlistsService: PlaylistService
  ) { }

  ngOnInit() {
    this.loadMorePlaylists(() => { });
  }

  loadMorePlaylists(onLoadedMoreCallback: Function): void {
    const playlistIds = this.channelSection.contentDetails.playlists;

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
      this.totalResultsCount = data.pageInfo.totalResults;

      this.playlistsStartIndex = playlistsEndIndex;

      onLoadedMoreCallback();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { PlaylistsService } from 'src/app/playlist/services/playlists.service';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';

@Component({
  selector: 'app-multiple-playlists',
  templateUrl: './multiple-playlists.component.html',
  styleUrls: ['./multiple-playlists.component.scss']
})
export class MultiplePlaylistsComponent implements OnInit, OnDestroy {

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMorePlaylists(onLoadedMoreCallback);
  playlists: Playlist[] = [];
  thumbnailSize: string = VideoThumbnailSize[VideoThumbnailSize.default];
  totalResultsCount: number;
  private playlistsStartIndex: number = 0;
  private subscription: Subscription;

  constructor(
    private playlistsService: PlaylistsService,
    private thumbnailService: ThumbnailsService
  ) { }

  getThumnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailService.getThumbnailUrl(VideoThumbnailSize.default, thumbnails);

    return url;
  }

  ngOnInit() {
    this.loadMorePlaylists(() => { });
  }

  loadMorePlaylists(onLoadedMoreCallback: Function): void {
    const playlistIds = this.channelSection.contentDetails.playlists;

    this.totalResultsCount = playlistIds.length;

    const playlistsEndIndex = this.playlistsStartIndex + MainConstants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = playlistIds.slice(this.playlistsStartIndex, playlistsEndIndex);
    this.subscription = this.playlistsService.getByIds(currentPagePlaylistIds, null, 0)
      .subscribe(data => {
      this.playlists.push(...data.items);

      this.playlistsStartIndex = playlistsEndIndex;

      onLoadedMoreCallback();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

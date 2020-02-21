import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, QueryList, ViewChildren } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { PlaylistsService } from 'src/app/services-singleton/playlists.service';
import { Subscription } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistElementService } from '../services/playlist-element.service';
import { BasePlaylistComponent } from '../base-playlist-component';
import { Constants } from 'src/app/shared/constants';
import { WindowService } from 'src/app/services-singleton/window.service';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { Thumbnail } from 'src/app/models/thumbnail/thumbnail';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';

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
  thumbnailSize: string = VideoThumbnailSize[VideoThumbnailSize.default];
  totalResultsCount: number;
  private playlistsStartIndex: number = 0;
  private subscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    playlistElementService: PlaylistElementService,
    public windowService: WindowService,
    private playlistsService: PlaylistsService,
    private thumbnailService: ThumbnailsService
  ) {
    super(playlistElementService, changeDetectorRef);
  }

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

    const playlistsEndIndex = this.playlistsStartIndex + Constants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = playlistIds.slice(this.playlistsStartIndex, playlistsEndIndex);
    this.subscription = this.playlistsService.getByIds(currentPagePlaylistIds, null, 0)
      .subscribe(data => {
      this.playlists.push(...data.items);

      this.playlistsStartIndex = playlistsEndIndex;

      onLoadedMoreCallback();

      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewChecked, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';
import { PlaylistElementService } from '../services/playlist-element.service';
import { BasePlaylistComponent } from '../base-playlist-component';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChannelsPlaylistComponent extends BasePlaylistComponent implements OnInit, AfterViewChecked {

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    playlistElementService: PlaylistElementService,
    public windowService: WindowService,
    private channelService: ChannelService
  ) {
    super(playlistElementService, changeDetectorRef);
  }

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMoreVideos(onLoadedMoreCallback);
  channels: Channel[] = [];
  totalResultsCount: number;
  private channelsStartIndex: number = 0;

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  loadMoreVideos(onLoadedMoreCallback: Function): void {
    const channelIds = this.channelSection.contentDetails.channels;
    this.totalResultsCount = channelIds.length;

    const channelsEndIndex = this.channelsStartIndex + Constants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = channelIds.slice(this.channelsStartIndex, channelsEndIndex);
    this.channelService.getByIds(currentPagePlaylistIds, null, 0).subscribe(data => {
      this.channels.push(...data.items);
      this.channelsStartIndex = channelsEndIndex;

      onLoadedMoreCallback();

      this.changeDetectorRef.detectChanges();
    });
  }
}

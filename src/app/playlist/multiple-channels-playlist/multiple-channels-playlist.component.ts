import { Component, Input, OnInit, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss']
})
export class MultipleChannelsPlaylistComponent implements OnInit {

  constructor(
    private channelService: ChannelService
  ) { }

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

  loadMoreVideos(onLoadedMoreCallback: Function): void {
    const channelIds = this.channelSection.contentDetails.channels;
    this.totalResultsCount = channelIds.length;

    const channelsEndIndex = this.channelsStartIndex + Constants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = channelIds.slice(this.channelsStartIndex, channelsEndIndex);
    this.channelService.getByIds(currentPagePlaylistIds, null, 0).subscribe(data => {
      this.channels.push(...data.items);
      this.channelsStartIndex = channelsEndIndex;

      onLoadedMoreCallback();
    });
  }
}

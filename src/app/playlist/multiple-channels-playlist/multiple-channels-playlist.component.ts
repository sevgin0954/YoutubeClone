import { Component, Input, OnInit } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';

const MAX_RESULTS_PER_PAGE = 5;

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
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMoreVideos(onLoadedMoreCallback);
  channels: Channel[] = [];
  totalResultsCount: number;
  private channelsStartIndex: number = 0;
  private pageToken: string;

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  loadMoreVideos(onLoadedMoreCallback: Function): void {
    const channelIds = this.channelSection.contentDetails.channels;

    const channelsEndIndex = this.channelsStartIndex + MainConstants.MAX_PLAYLIST_ITEM_RESULTS;

    const currentPagePlaylistIds = channelIds.slice(this.channelsStartIndex, channelsEndIndex);
    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE, this.pageToken);
    const resourceProprties = [
      ChannelResource.snippet,
      ChannelResource.statistics,
      ChannelResource.id
    ];
    this.channelService.getByIds(currentPagePlaylistIds, pageArgs, resourceProprties)
      .subscribe(data => {
        this.pageToken = data.nextPageToken;
        this.channels.push(...data.items);
        this.totalResultsCount = data.pageInfo.totalResults;
        this.channelsStartIndex = channelsEndIndex;

        onLoadedMoreCallback();
      });
  }
}

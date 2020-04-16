import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Channel } from 'src/app/models/channel/channel';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';

const MAX_RESULTS_PER_PAGE = 30;
const TITLE = 'Subscription';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit, OnDestroy {

  channels: Channel[] = [];
  isCurrentlyLoading: boolean = false;
  isMoreSubscriptions: boolean = true;
  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;
  title: string = TITLE;
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private channelsSubscribtion: Subscription;

  constructor(
    private channelService: ChannelService
  ) { }

  ngOnInit() {
    this.loadMoreSubscriptions();
  }

  ngOnDestroy() {
    this.channelsSubscribtion.unsubscribe()
  }

  loadMoreSubscriptions = (): void => {
    this.isCurrentlyLoading = true;

    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE, this.nextPageToken);
    const resources = [
      ChannelResource.snippet
    ];
    this.channelsSubscribtion = this.channelService
      .getSubscriptions(pageArgs, resources)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.channels.push(...data.items);

        this.isFirstPage = false;
        this.isCurrentlyLoading = false;

        this.updateIsMoreSubscriptions();
      });
  }

  private updateIsMoreSubscriptions(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreSubscriptions = false;
    }
  }
}

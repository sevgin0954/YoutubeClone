import { Component, OnInit, OnDestroy } from '@angular/core';

import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';
import { Subscription } from 'rxjs';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResource } from '../shared/enums/resource-properties/channel-resource';

const MAX_RESULTS_PER_PAGE = 30;

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {

  channels: Channel[] = [];
  isCurrentlyLoading: boolean = false;
  isMoreSubscriptions: boolean = true;
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

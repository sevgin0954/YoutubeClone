import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';
import { WindowService } from '../services-singleton/window.service';
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

  channels: Channel[];
  isCurrentlyLoading: boolean = false;
  isMoreSubscriptions: boolean = true;
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private channelsSubscribtion: Subscription;

  constructor(
    private channelService: ChannelService,
    private windowService: WindowService
  ) {
    this.channels = [];
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    if (this.isCurrentlyLoading) {
      return;
    }
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreSubscriptions = false;
    }

    if (this.isMoreSubscriptions) {
      this.windowService.onReachBottom(() => {
        this.loadMoreSubscriptions();
        this.isFirstPage = false;
      });
    }
  }

  ngOnInit() {
    this.loadMoreSubscriptions();
  }

  ngOnDestroy() {
    this.channelsSubscribtion.unsubscribe()
  }

  private loadMoreSubscriptions(): void {
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

        this.isCurrentlyLoading = false;
      });
  }
}

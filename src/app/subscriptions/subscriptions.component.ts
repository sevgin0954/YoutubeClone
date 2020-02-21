import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';
import { WindowService } from '../services-singleton/window.service';
import { FormatterService } from '../services-singleton/formatter.service';
import { Subscription } from 'rxjs';

const MAX_DESCRIPTION_LENGTH: number = 100;
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
    private formatterService: FormatterService,
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

    this.channelsSubscribtion = this.channelService
      .getSubscriptions(MAX_RESULTS_PER_PAGE, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        data.items.forEach(currentChannel => {
          const description = currentChannel.snippet.description;
          const conciseDescription = this.formatterService
            .getConcisedString(description, MAX_DESCRIPTION_LENGTH);
          currentChannel.snippet.description = conciseDescription;
        });
        this.channels.push(...data.items);

        this.isCurrentlyLoading = false;
      });
  }
}

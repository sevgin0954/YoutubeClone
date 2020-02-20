import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';
import { WindowService } from '../services-singleton/window.service';
import { FormatterService } from '../services-singleton/formatter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {

  channels: Channel[];
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
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreSubscriptions = false;
    }

    if (this.isMoreSubscriptions) {
      this.windowService.onReachBottom(() => this.loadMoreSubscriptions());
      this.isFirstPage = false;
    }
  }

  ngOnInit() {
    this.loadMoreSubscriptions();
  }

  ngOnDestroy() {
    this.channelsSubscribtion.unsubscribe()
  }

  private loadMoreSubscriptions(): void {
    const maxDescriptionLength = 100;

    const maxResults = 30;
    this.channelsSubscribtion = this.channelService.getSubscriptions(maxResults, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        data.items.forEach(currentChannel => {
          const description = currentChannel.snippet.description;
          const conciseDescription = this.formatterService.getConcisedString(description, maxDescriptionLength);
          currentChannel.snippet.description = conciseDescription;
        });
        this.channels.push(...data.items);
      });
  }
}

import { Component, OnInit, HostListener } from '@angular/core';
import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';
import { WindowService } from '../services-singleton/window.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  baseChannelUrl: string = Constants.BASE_CHANNEL_URL;
  channels: Channel[];
  nextPageToken: string;

  constructor(
    private channelService: ChannelService,
    private windowService: WindowService
  ) {
    this.channels = [];
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    this.windowService.onReachBottom(() => this.loadSubscriptions());
  }

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    const maxDescriptionLength = 100;

    const maxResults = 50;
    this.channelService.getSubscriptions(maxResults, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        data.items.forEach(currentChannel => {
          const conciseDescription = this.getConciseDescription(currentChannel, maxDescriptionLength);
          currentChannel.snippet.description = conciseDescription;
        });
        this.channels.push(...data.items);
      });
  }

  getConciseDescription(channel: Channel, maxDescriptionLength: number): string {
    const description = channel.snippet.description;
    if (description.length > maxDescriptionLength) {
      const conciseDescription = description.slice(0, maxDescriptionLength) + '...';
      return conciseDescription;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Channel } from '../models/channel/channel';
import { ChannelService } from '../services-singleton/channel.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  baseChannelUrl: string = 'https://www.youtube.com/user/';
  channels: Channel[];
  nextPageToken: string;

  constructor(private channelService: ChannelService) {
    this.channels = [];
  }

  ngOnInit() {
    const maxResults = 50;
    this.channelService.getSubscriptions(maxResults, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.channels.push(...data.items);
      });
  }

}

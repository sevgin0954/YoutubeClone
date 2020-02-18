import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { ChannelService } from 'src/app/services-singleton/channel.service';
import { Channel } from 'src/app/models/channel/channel';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Subscription as VideoSubscribtion } from 'src/app/models/subscribption/subscription';
import { SubscriptionsService } from 'src/app/services-singleton/subscriptions.service';
import { concatMap } from 'rxjs/operators';
import { Subscription as RxjsSubscription } from 'rxjs';

@Component({
  selector: 'app-channel-mini',
  templateUrl: './channel-mini.component.html',
  styleUrls: ['./channel-mini.component.scss']
})
export class ChannelMiniComponent implements OnChanges, OnDestroy {

  @Input() channelId: string;
  channel: Channel;
  isSubscribed: boolean;
  private videoSubscription: VideoSubscribtion;
  private rxjsSubscription: RxjsSubscription;

  constructor(
    private channelService: ChannelService,
    public formatterService: FormatterService,
    private subscriptionsService: SubscriptionsService,
  ) { }

  ngOnChanges(): void {
    this.rxjsSubscription = this.channelService.getByIds(this.channelId).pipe(
      concatMap(channels => {
        this.channel = channels[0];

        return this.subscriptionsService.getById(this.channel.id);
      })
    ).subscribe(videoSubscribtion => {
      if (videoSubscribtion) {
        this.isSubscribed = true;
        this.videoSubscription = videoSubscribtion;
      }
      else {
        this.isSubscribed = false;
      }
    });
  }

  onSubscribe(): void {
    this.subscriptionsService.subscribe(this.channel.id).subscribe(data => {
      this.isSubscribed = true;
      this.videoSubscription = data;
    });
  }

  onUnsubscribe(): void {
    this.subscriptionsService.unsubscribe(this.videoSubscription.id).subscribe(data => {
      if (data >= 200 && data <= 299) {
        this.isSubscribed = false;
        this.videoSubscription = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.rxjsSubscription.unsubscribe();
  }
}

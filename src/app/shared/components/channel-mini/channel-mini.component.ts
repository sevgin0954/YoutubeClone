import { Component, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Subscription as VideoSubscribtion } from 'src/app/models/subscribption/subscription';
import { SubscriptionsService } from 'src/app/services-singleton/subscriptions.service';
import { Subscription as RxjsSubscription } from 'rxjs';
import { SubscriptionResource } from '../../enums/resource-properties/subscription-resource';
import isRequired from 'src/app/decorators/isRequired';
import isType from 'src/app/decorators/isType';

@Component({
  selector: 'app-channel-mini',
  templateUrl: './channel-mini.component.html',
  styleUrls: ['./channel-mini.component.scss']
})
export class ChannelMiniComponent implements OnChanges, OnDestroy {

  @isRequired
  @isType('object')
  @Input()
  channel: Channel;

  @Output()
  private channelLoaded = new EventEmitter();

  @Output()
  private update = new EventEmitter();

  isSubscribed: boolean;
  private videoSubscription: VideoSubscribtion;
  private rxjsSubscription: RxjsSubscription;

  constructor(
    public formatterService: FormatterService,
    private subscriptionsService: SubscriptionsService,
  ) { }

  ngOnChanges(): void {
    const resources = [
      SubscriptionResource.snippet
    ];
    this.rxjsSubscription = this.subscriptionsService
      .getById(this.channel.id, resources)
      .subscribe(videoSubscribtion => {
        if (videoSubscribtion) {
          this.isSubscribed = true;
          this.videoSubscription = videoSubscribtion;
        }
        else {
          this.isSubscribed = false;
        }

        this.channelLoaded.emit();
    });
  }

  onSubscribe(): void {
    const resources = [
      SubscriptionResource.snippet
    ];
    this.subscriptionsService.subscribe(this.channel.id, resources).subscribe(data => {
      this.isSubscribed = true;
      this.videoSubscription = data;

      this.update.emit();
    });
  }

  onUnsubscribe(): void {
    this.subscriptionsService.unsubscribe(this.videoSubscription.id).subscribe(data => {
      if (data >= 200 && data <= 299) {
        this.isSubscribed = false;
        this.videoSubscription = undefined;
      }

      this.update.emit();
    });
  }

  ngOnDestroy(): void {
    this.rxjsSubscription.unsubscribe();
  }
}

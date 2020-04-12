import { Component, Input, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription as VideoSubscribtion } from 'src/app/models/subscribption/subscription';
import { SubscriptionResource } from 'src/app/shared/enums/resource-properties/subscription-resource';
import isRequired from 'src/app/decorators/isRequired';
import { Subscription } from 'rxjs';
import { SubscriptionsService } from 'src/app/services-singleton/subscriptions.service';

@Component({
  selector: 'app-channel-subscribe-button',
  templateUrl: './channel-subscribe-button.component.html',
  styleUrls: ['./channel-subscribe-button.component.scss']
})
export class ChannelSubscribeButtonComponent implements OnChanges, OnDestroy {

  @isRequired
  @Input()
  channelId: string;

  isSubscribed: boolean;
  private videoSubscription: VideoSubscribtion;
  private rxjsSubscription: Subscription;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private subscriptionsService: SubscriptionsService,
  ) { }

  ngOnChanges(): void {
    const resources = [
      SubscriptionResource.snippet
    ];
    this.rxjsSubscription = this.subscriptionsService
      .getById(this.channelId, resources)
      .subscribe(videoSubscribtion => {
        if (videoSubscribtion) {
          this.isSubscribed = true;
          this.videoSubscription = videoSubscribtion;
        }
        else {
          this.isSubscribed = false;
        }

        this.changeDetectionRef.detectChanges();
    });
  }

  onSubscribe(): void {
    const resources = [
      SubscriptionResource.snippet
    ];
    this.subscriptionsService.subscribe(this.channelId, resources).subscribe(data => {
      this.isSubscribed = true;
      this.videoSubscription = data;

      this.changeDetectionRef.detectChanges();
    });
  }

  onUnsubscribe(): void {
    this.subscriptionsService.unsubscribe(this.videoSubscription.id).subscribe(data => {
      if (data >= 200 && data <= 299) {
        this.isSubscribed = false;
        this.videoSubscription = undefined;
      }

      this.changeDetectionRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.rxjsSubscription.unsubscribe();
  }
}

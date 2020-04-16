import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Channel } from 'src/app/models/channel/channel';
import { Subscription } from 'rxjs';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit, OnDestroy {

  channel: Channel;
  mainElementId = MainConstants.SKIP_TO_ELEMENT_ID;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(data => {
      this.channel = data['channel'];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription as RxjsSubscribtion } from 'rxjs';
import { Video } from 'src/app/models/video/video';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  channel: Channel;
  maxDisplayedCharacters: number = 120;
  video: Video;
  private subscribtion: RxjsSubscribtion;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService
  ) { }

  ngOnInit(): void {
    this.video = this.route.snapshot.data['video'];

    this.initChannel();
  }

  private initChannel(): void {
    const channelId = this.video.snippet.channelId;
    const pageArgs = new PageArguments(1, null);
    const resourceProperties = [
      ChannelResource.snippet,
      ChannelResource.statistics
    ];
    this.subscribtion = this.channelService.getByIds([channelId], pageArgs, resourceProperties)
      .subscribe(channel => {
        this.channel = channel.items[0];
      });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}

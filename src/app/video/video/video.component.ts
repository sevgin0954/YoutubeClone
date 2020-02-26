import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription as RxjsSubscribtion } from 'rxjs';
import { Video } from 'src/app/models/video/video';
import { YoutubeIframeService } from 'src/app/video/services/youtube-iframe.service';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  channel: Channel;
  video: Video;
  maxDisplayedCharacters: number = 120;
  private subscribtion: RxjsSubscribtion;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private youtubeIframeService: YoutubeIframeService
  ) { }

  ngOnInit(): void {
    this.video = this.route.snapshot.data['video'];

    const isResponsive = true;
    const shouldOverflow = false;
    this.youtubeIframeService.init(this.video.id, isResponsive, shouldOverflow);

    const channelId = this.video.snippet.channelId;
    this.subscribtion = this.channelService.getByIds([channelId], null, 1).subscribe(channel => {
      this.channel = channel.items[0];
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  @HostListener('window:resize')
  onVideoResize(): void {
    this.youtubeIframeService.resizeHeight();
  }
}

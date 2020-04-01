import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription as RxjsSubscribtion } from 'rxjs';
import { Video } from 'src/app/models/video/video';
import { YoutubeIframeService } from 'src/app/video/services/youtube-iframe.service';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('playerContainer', { static: false }) playerContainer: ElementRef;
  channel: Channel;
  video: Video;
  maxDisplayedCharacters: number = 120;
  private resizeSubscription: any;
  private subscribtion: RxjsSubscribtion;

  constructor(
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private youtubeIframeService: YoutubeIframeService
  ) { }

  ngOnInit(): void {
    this.video = this.route.snapshot.data['video'];

    this.initChannel();
  }

  ngAfterViewInit(): void {
    this.initVideo(() => {
      // @ts-ignore
      this.resizeSubscription = new ResizeObserver(subscribers => {
        this.youtubeIframeService.resizeHeight();
      });
      this.resizeSubscription.observe(this.playerContainer.nativeElement);
    });
  }

  private initVideo(onReadyCallback: Function): void {
    const isResponsive = true;

    const videoHeight = this.video.player.embedHeight;
    const videoWidth = this.video.player.embedWidth;
    const aspectRation = videoWidth / videoHeight;

    this.youtubeIframeService.init(this.video.id, isResponsive, aspectRation, onReadyCallback);
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
    this.resizeSubscription.unobserve(this.playerContainer.nativeElement);
    this.subscribtion.unsubscribe();
  }

  onChangee(): void {
    console.log('change video component')
  }
}

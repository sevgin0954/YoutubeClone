import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';

import { YoutubeIframeService } from '../services/youtube-iframe.service';
import { Video } from 'src/app/models/video/video';
import isRequired from 'src/app/decorators/isRequired';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Component({
  selector: 'app-video-youtube-iframe',
  templateUrl: './video-youtube-iframe.component.html',
  styleUrls: ['./video-youtube-iframe.component.scss']
})
export class VideoYoutubeIframeComponent implements AfterViewInit, OnDestroy {

  @isRequired
  @Input()
  video: Video;

  @ViewChild('playerContainer')
  playerContainer: ElementRef;

  private player: any;
  private resizeSubscription: any;

  constructor(
    private youtubeIframeService: YoutubeIframeService
  ) { }

  ngAfterViewInit(): void {
    this.initPlayer();
  }

  private addResizeEventListener(aspectRatio: number): void {
    // @ts-ignore
    this.resizeSubscription = new ResizeObserver(subscribers => {
      this.youtubeIframeService.resizeHeight(this.player, aspectRatio);
    });
    this.resizeSubscription.observe(this.playerContainer.nativeElement);
  }

  private initPlayer() {
    const videoHeight = this.video.player.embedHeight;
    const videoWidth = this.video.player.embedWidth;
    const aspectRatio = videoWidth / videoHeight;

    const isResponsive = true;

    if (window['YT']) {
      this.startVideo(aspectRatio, isResponsive);
      return;
    }

    var tag = document.createElement('script');
    tag.src = MainConstants.YOUTUBE_IFRAME_BASE_URL;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo(aspectRatio, isResponsive);
    }
  }

  private startVideo(aspectRatio: number, isReposnsive: boolean) {
    this.player = new window['YT'].Player('player', {
      videoId: this.video.id,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 1,
        playsinline: 1
      },
      events: {
        'onReady': this.onPlayerReady.bind(this, aspectRatio, isReposnsive)
      }
    });
  }

  private onPlayerReady(aspectRatio: number, isReponsive: boolean, event: any) {
    this.addResizeEventListener(aspectRatio);

    this.youtubeIframeService.playVideo(event);

    if (isReponsive) {
      this.youtubeIframeService.makeResponsive(this.player);
      this.youtubeIframeService.resizeHeight(this.player, aspectRatio);
    }
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unobserve(this.playerContainer.nativeElement);
  }
}

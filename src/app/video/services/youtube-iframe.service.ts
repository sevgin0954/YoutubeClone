import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeIframeService {

  private aspectRatio: number;
  private player: any;
  private videoId: string;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init(id: string, isReposnsive: boolean, aspectRatio: number) {
    this.videoId = id;
    this.aspectRatio = aspectRatio;

    if (window['YT']) {
      this.startVideo(isReposnsive);
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo(isReposnsive);
    }
  }

  private startVideo(isReposnsive: boolean) {
    this.player = new window['YT'].Player('player', {
      videoId: this.videoId,
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
        'onReady': this.onPlayerReady.bind(this, isReposnsive)
      }
    });
  }

  private onPlayerReady(isReponsive: boolean, event: any) {
    this.playVideo(event);

    if (isReponsive) {
      this.makeResponsive();
      // Should be called twice, otherwise it wont calculate the height properly
      this.resizeHeight();
      this.resizeHeight();
    }
  }

  playVideo(event: any): void {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  private makeResponsive(): void {
    const playerElement = this.player.getIframe();
    playerElement.width = '100%';
  }

  resizeHeight(): void {
    const playerElement = this.player.getIframe();

    const currentWidth = playerElement.offsetWidth;
    console.log(currentWidth)
    const resizedHeight = Math.ceil(currentWidth / this.aspectRatio);
    playerElement.height = resizedHeight;
  }
}

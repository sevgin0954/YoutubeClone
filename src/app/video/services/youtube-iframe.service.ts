import { Injectable } from '@angular/core';

// TODO: Move the logic back to component
@Injectable()
export class YoutubeIframeService {

  private aspectRatio: number;
  private player: any;
  private videoId: string;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init(id: string, isReposnsive: boolean, aspectRatio: number, onReadyCallback?: Function) {
    this.videoId = id;
    this.aspectRatio = aspectRatio;

    if (window['YT']) {
      this.startVideo(isReposnsive, onReadyCallback);
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo(isReposnsive, onReadyCallback);
    }
  }

  private startVideo(isReposnsive: boolean, onReadyCallback) {
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
        'onReady': this.onPlayerReady.bind(this, isReposnsive, onReadyCallback)
      }
    });
  }

  private onPlayerReady(isReponsive: boolean, onReadyCallback, event: any) {
    onReadyCallback();

    this.playVideo(event);

    if (isReponsive) {
      this.makeResponsive();
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
    playerElement.style.maxHeight = 'inherit';
    playerElement.width = '100%';
  }

  resizeHeight(): void {
    const playerElement = this.player.getIframe();

    const currentWidth = playerElement.offsetWidth;
    const resizedHeight = Math.ceil(currentWidth / this.aspectRatio);
    playerElement.height = resizedHeight;
  }
}

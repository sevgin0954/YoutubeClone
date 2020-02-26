import { Injectable } from '@angular/core';

const PLAYER_INFO_KEY = 'b';
const PLAYER_HTML_ELEMENT_KEY = 'a';

@Injectable()
export class YoutubeIframeService {

  private ratio: number;
  //private reframed: Boolean = false;
  private player: any;
  private videoId: string;
  //private YT: any;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init(id: string, isReposnsive: boolean, shouldOverflow: boolean) {
    this.videoId = id;

    if (window['YT']) {
      this.startVideo(isReposnsive, shouldOverflow);
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo(isReposnsive, shouldOverflow);
    }
  }

  private startVideo(isReposnsive: boolean, shouldOverflow: boolean) {
    //this.reframed = false;
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
        'onReady': this.onPlayerReady.bind(this, isReposnsive, shouldOverflow)
      }
    });
  }

  private onPlayerReady(isReposnsive: boolean, shouldOverflow: boolean, event) {
    this.playVideo(event);
    this.initRation();

    if (shouldOverflow === false) {
      this.setMaxHeight('inherit');
    }

    if (isReposnsive) {
      this.makeResponsive();
      this.resizeHeight();
    }
  }

  private setMaxHeight(value: string): void {
    const playerElement: HTMLElement = this.player[PLAYER_HTML_ELEMENT_KEY];

    playerElement.style.maxHeight = value;
  }

  playVideo(event): void {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  private initRation(): void {
    const playerInfo = this.player[PLAYER_INFO_KEY].b;
    const width = playerInfo.width;
    const height = playerInfo.height;

    this.ratio = width / height;
  }

  private makeResponsive(): void {
    const playerElement = this.player[PLAYER_HTML_ELEMENT_KEY];

    playerElement.width = '100%';
    playerElement.height = 'auto';
  }

  resizeHeight(): void {
    const playerElement = this.player[PLAYER_HTML_ELEMENT_KEY];

    const currentWidth = playerElement.offsetWidth;
    const resizedHeight = Math.ceil(currentWidth / this.ratio);
    playerElement.height = resizedHeight;
  }
}

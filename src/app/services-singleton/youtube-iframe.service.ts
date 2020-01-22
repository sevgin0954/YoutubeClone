import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoutubeIframeService {

  YT: any;
  videoId: string;
  player: any;
  reframed: Boolean = false;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  init(id: string) {
    this.videoId = id;

    if (window['YT']) {
      this.startVideo();
      return;
    }

    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => {
      this.startVideo();
    }
  }

  private startVideo() {
    this.reframed = false;
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
        'onReady': this.onPlayerReady.bind(this)
      }
    });
  }

  private onPlayerReady(event) {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  private cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };
}

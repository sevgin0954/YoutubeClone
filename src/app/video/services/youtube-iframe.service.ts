import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeIframeService {

  private isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  playVideo(event: any): void {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  makeResponsive(player: any): void {
    const playerElement = player.getIframe();
    playerElement.style.maxHeight = 'inherit';
    playerElement.width = '100%';
  }

  resizeHeight(player: any, aspectRatio: number): void {
    const playerElement = player.getIframe();

    const currentWidth = playerElement.offsetWidth;
    const resizedHeight = Math.ceil(currentWidth / aspectRatio);
    playerElement.height = resizedHeight;
  }
}

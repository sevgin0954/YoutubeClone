import { Component, OnInit, HostListener } from '@angular/core';
import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import * as moment from 'moment';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  videos: Video[];
  nextPageToken: string;
  baseVideoUrl: string = 'https://www.youtube.com/watch?v=';
  baseChannelUrl: string = 'https://www.youtube.com/user/';

  constructor(private videoService: VideoService) {
    this.videos = [];
  }

  getViewCountString(viewCount: number): string {
    let numberName = '';
    let numberResult = '';

    const viewCountAsString = viewCount.toString();
    const viewCountLength = viewCountAsString.length;
    if (viewCountLength <= 3) {
      numberResult = viewCountAsString;
    }
    else if (viewCountLength <= 4) {
      numberName = 'K';
    }
    else if (viewCountLength <= 10) {
      numberName = 'M';
    }
    else if (viewCountLength <= 16) {
      numberName = 'B';
    }

    if (viewCountLength > 3) {
      numberResult = `${viewCountAsString[0]},${viewCountAsString[1]}`
    }

    return numberResult + numberName;
  }

  getPublishedDateString(date: string): string {
    let result = moment(date).fromNow();

    return result;
  }

  // TODO: unsubscribe or use resolver
  ngOnInit() {
    this.loadMostPupularMovies();
  }

  onReachBottom(): void {
    this.loadMostPupularMovies();
  }

  // TODO: Reuse
  @HostListener("window:scroll")
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          this.onReachBottom();
      }
  }

  private loadMostPupularMovies(): void {
    const regionCode = 'BG';
    const maxResults = 25;
    this.videoService.getMostPopular(regionCode, maxResults, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.videos.push(...data.items);
      });
  }
}

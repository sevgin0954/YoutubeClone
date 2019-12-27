import { Component, OnInit, HostListener } from '@angular/core';
import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import * as moment from 'moment';
import { WindowService } from '../services-singleton/window.service';

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

  constructor(
    private videoService: VideoService,
    private windowService: WindowService
  ) {
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

  @HostListener("window:scroll")
  private onReachBottom(): void {
    this.windowService.onReachBottom(() => this.loadMostPupularMovies());
  }


  private loadMostPupularMovies(): void {
    const maxDescriptionLength = 200;

    const regionCode = 'BG';
    const maxResults = 25;
    this.videoService.getMostPopular(regionCode, maxResults, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        data.items.forEach(video => {
          const description = video.snippet.description;
          if (description.length > maxDescriptionLength) {
            const conciseDescription = description.slice(0, maxDescriptionLength) + '...';
            video.snippet.description = conciseDescription;
          }
        });
        this.videos.push(...data.items);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video/video';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  videos$: Observable<Video[]>;
  baseVideoUrl: string = 'https://www.youtube.com/watch?v=';
  baseChannelUrl: string = 'https://www.youtube.com/user/';

  constructor(private videoService: VideoService) { }

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

  ngOnInit() {
    const regionCode = 'BG';
    const maxResults = 50;
    this.videos$ = this.videoService.getMostPopular(regionCode, maxResults);
  }
}

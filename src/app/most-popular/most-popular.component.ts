import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video/video';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  videos$: Observable<Video[]>;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    const regionCode = 'BG';
    const maxResults = 10;
    this.videos$ = this.videoService.getMostPopular(regionCode, maxResults);
  }

}

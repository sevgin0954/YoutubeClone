import { Component, OnInit, HostListener } from '@angular/core';
import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import { WindowService } from '../services-singleton/window.service';
import { FormatterService } from '../services-singleton/formatter.service';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit {

  videos: Video[];
  nextPageToken: string;
  baseChannelUrl: string = Constants.BASE_CHANNEL_URL;

  constructor(
    private videoService: VideoService,
    private windowService: WindowService,
    public formatterService: FormatterService
  ) {
    this.videos = [];
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

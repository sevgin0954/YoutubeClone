import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import { WindowService } from '../services-singleton/window.service';
import { FormatterService } from '../services-singleton/formatter.service';
import { Subscription } from 'rxjs';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit, OnDestroy {

  videos: Video[];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxLength: number = Constants.TITLE_MAX_LENGTH;
  private nextPageToken: string;
  private videosSubscription: Subscription;

  constructor(
    private videoService: VideoService,
    private windowService: WindowService,
    public formatterService: FormatterService
  ) {
    this.videos = [];
  }

  ngOnInit() {
    this.loadMoreVideos();
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    this.windowService.onReachBottom(() => this.loadMoreVideos());
  }

  private loadMoreVideos(): void {
    const maxDescriptionLength = 200;

    const regionCode = 'BG';
    const maxResults = 25;
    this.videosSubscription = this.videoService.getMostPopular(regionCode, maxResults, this.nextPageToken)
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

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}

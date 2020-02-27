import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import { WindowService } from '../services-singleton/window.service';
import { FormatterService } from '../services-singleton/formatter.service';
import { Subscription } from 'rxjs';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';
import { Constants } from '../shared/constants';

const REGION_CODE: string = 'BG';
const MAX_RESULTS_PER_PAGE = 25;

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit, OnDestroy {

  isFirstPage: boolean = true;
  isCurrentlyLoadingVideos: boolean = false;
  isMoreVideos: boolean = true;
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
    if (this.isCurrentlyLoadingVideos) {
      return;
    }
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreVideos = false;
    }

    if (this.isMoreVideos) {
      this.windowService.onReachBottom(() => {
        this.loadMoreVideos();
        this.isFirstPage = this.isFirstPage;
      });
    }
  }

  loadMoreVideos(): void {
    this.isCurrentlyLoadingVideos = true;

    this.videosSubscription = this.videoService
      .getMostPopular(REGION_CODE, MAX_RESULTS_PER_PAGE, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.videos.push(...data.items);

        this.isCurrentlyLoadingVideos = false;
      });
  }

  ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}

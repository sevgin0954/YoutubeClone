import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Video } from '../models/video/video';
import { VideoService } from '../services-singleton/video.service';
import { Subscription } from 'rxjs';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';
import { PageArguments } from '../shared/arguments/page-arguments';
import { VideoResource } from '../shared/enums/resource-properties/video-resource';
import { RegionCode } from '../shared/enums/region-code';
import { GeolocationService } from '../services-singleton/geolocation.service';

const MAX_RESULTS_PER_PAGE = 25;
const VIDEO_DESCRIPTION_DISPLAYED_ROWS = 3;
const VIDEO_TITLE_DISPLAYED_ROWS = 2;

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent implements OnInit, OnDestroy {

  areMoreVideos: boolean = true;
  isCurrentlyLoading: boolean = false;
  videoDescriptionMaxDisplayedRows: number = VIDEO_DESCRIPTION_DISPLAYED_ROWS;
  videos: Video[] = [];
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
  videoTitleMaxDisplayedRows: number = VIDEO_TITLE_DISPLAYED_ROWS;
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private regionCode: RegionCode;
  private subscription: Subscription = new Subscription();

  constructor(
    private geolacationService: GeolocationService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.isCurrentlyLoading = true;

    const regionSubscription = this.geolacationService.getRegionCode().subscribe(data => {
      this.regionCode = data;
      this.isCurrentlyLoading = false;

      this.loadMoreVideos();
    });
    this.subscription.add(regionSubscription);
  }

  loadMoreVideos = (): void => {
    this.isCurrentlyLoading = true;

    const pageArgument = new PageArguments(MAX_RESULTS_PER_PAGE, this.nextPageToken);
    const resources = [
      VideoResource.snippet,
      VideoResource.contentDetails,
      VideoResource.status,
      VideoResource.statistics,
      VideoResource.player
    ];
    const videoSubscription = this.videoService
      .getMostPopular(this.regionCode, pageArgument, resources)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.videos.push(...data.items);

        this.isFirstPage = false;
        this.isCurrentlyLoading = false;

        this.updateAreMoreVideos();
      });
    this.subscription.add(videoSubscription);
  }

  private updateAreMoreVideos(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.areMoreVideos = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

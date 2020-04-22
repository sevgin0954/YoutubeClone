import { Component } from '@angular/core';

import { VideoService } from '../../services-singleton/video.service';
import { GeolocationService } from '../../services-singleton/geolocation.service';
import { loadVideosCallback } from '../../types';
import { MainConstants } from '../../shared/constants/main-constants';

const TITLE = 'Trending videos';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent {

  loadVideosCallback: loadVideosCallback;
  isCurrentlyLoading: boolean = true;
  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;
  title: string = TITLE;

  constructor(
    private geolacationService: GeolocationService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.isCurrentlyLoading = true;

    this.geolacationService.getRegionCode().subscribe(regionCode => {
      this.loadVideosCallback = (pageArgs, resources) => this.videoService
        .getMostPopular(regionCode, pageArgs, resources);

      this.isCurrentlyLoading = false;
    });
  }
}

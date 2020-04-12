import { Component } from '@angular/core';

import { VideoService } from '../services-singleton/video.service';
import { RegionCode } from '../shared/enums/region-code';
import { GeolocationService } from '../services-singleton/geolocation.service';
import { loadVideosCallback } from '../types';
import { MainConstants } from '../shared/Constants/main-constants';

const TITLE = 'Trending videos';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent {

  loadVideosCallback: loadVideosCallback = this.videoService.getMostPopular;
  isCurrentlyLoading: boolean = true;
  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;
  regionCode: RegionCode;
  title: string = TITLE;

  constructor(
    private geolacationService: GeolocationService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.isCurrentlyLoading = true;

    this.geolacationService.getRegionCode().subscribe(data => {
      this.regionCode = data;
      this.isCurrentlyLoading = false;
    });
  }
}

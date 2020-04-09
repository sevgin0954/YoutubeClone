import { Component } from '@angular/core';

import { VideoService } from '../services-singleton/video.service';
import { RegionCode } from '../shared/enums/region-code';
import { GeolocationService } from '../services-singleton/geolocation.service';
import { loadVideosCallback } from '../types';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.scss']
})
export class MostPopularComponent {

  loadVideosCallback: loadVideosCallback = this.videoService.getMostPopular;
  isCurrentlyLoading: boolean = true;
  regionCode: RegionCode;

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

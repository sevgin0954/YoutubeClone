import { Component, OnInit } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { VideoCategory } from 'src/app/models/video-category/video-category';
import { GeolocationService } from 'src/app/services-singleton/geolocation.service';
import { finalize, map } from 'rxjs/operators';
import { VideoCategoryResource } from 'src/app/shared/enums/resource-properties/video-category-resource';
import { Observable } from 'rxjs';
import { MainConstants } from 'src/app/shared/Constants/main-constants';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<VideoCategory[]>;
  isLoading: boolean = true;
  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;

  constructor(
    private categoriesService: CategoriesService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.geolocationService.getRegionCode().subscribe(regionCode => {
      const resources = [
        VideoCategoryResource.snippet
      ];
      this.categories$ = this.categoriesService.getByRegionCode(regionCode, resources).pipe(
        map(categories => categories.filter(category => category.snippet.assignable)),
        finalize(() => {
          this.isLoading = false;
        })
      );
    });
  }
}

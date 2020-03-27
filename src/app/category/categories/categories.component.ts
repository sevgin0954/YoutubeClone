import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { Subscription, Observable } from 'rxjs';
import { VideoCategory } from 'src/app/models/video-category/video-category';
import { GeolocationService } from 'src/app/services-singleton/geolocation.service';
import { concatMap, finalize, map } from 'rxjs/operators';
import { VideoCategoryResource } from 'src/app/shared/enums/resource-properties/video-category-resource';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<VideoCategory[]>;
  isLoading: boolean = true;

  constructor(
    private categoriesService: CategoriesService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.categories$ = this.geolocationService.getRegionCode().pipe(
      concatMap(regionCode => {
        const resources = [
          VideoCategoryResource.snippet
        ];

        return this.categoriesService.getByRegionCode(regionCode, resources).pipe(
          map(categories => categories.filter(category => category.snippet.assignable))
        );
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegionCode } from 'src/app/shared/enums/region-code';
import { VideoCategoryResource } from 'src/app/shared/enums/resource-properties/video-category-resource';
import { Observable } from 'rxjs';
import { QueryParamsUtility } from 'src/app/shared/utilities/query-params-utility';
import { Url } from 'src/app/shared/url';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import { VideoCategory } from 'src/app/models/video-category/video-category';
import { pluck } from 'rxjs/operators';

const PATH = 'videoCategories';

@Injectable()
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getByRegionCode(regionCode: RegionCode, resources: VideoCategoryResource[])
    : Observable<VideoCategory[]> {

    const queryParams = {
      regionCode: RegionCode[regionCode]
    };
    QueryParamsUtility.addResources(queryParams, resources, VideoCategoryResource);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<VideoCategory[]>(url.toString()).pipe(
      pluck<any, VideoCategory[]>('items')
    );

    return data$;
  }
}

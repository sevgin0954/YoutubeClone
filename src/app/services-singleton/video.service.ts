import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Url } from '../shared/url';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Video } from '../models/video/video';
import { pluck } from 'rxjs/operators';
import { MainConstants } from '../shared/Constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { VideoResourceProperties } from '../shared/enums/resource-properties/video-resource-properties';
import { DataValidator } from '../shared/Validation/data-validator';
import { RegionCode } from '../shared/enums/region-code';

const PATH = 'videos';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient
  ) { }

  getMostPopular(regionCode: RegionCode, pageArgs: PageArguments, resources: VideoResourceProperties[]):
    Observable<ServiceModel<Video[]>> {
    this.validateGetMostPopularArguments(regionCode, pageArgs, resources);

    const queryParams = {
      chart: 'mostPopular',
      regionCode: RegionCode[regionCode],
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.addResources(queryParams, resources, VideoResourceProperties);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Video[]>>(url.toString());

    return data$;
  }

  private validateGetMostPopularArguments(
    regionCode: RegionCode,
    pageArgs: PageArguments,
    resources: VideoResourceProperties[]
  ): void {
    DataValidator.nullOrUndefinied(regionCode, 'regionCode');
    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }

  getByIds(ids: string[], resources: VideoResourceProperties[]): Observable<Video[]> {
    this.validateGetByIds(ids, resources);

    const queryParams = {
      id: ids.join(',')
    };
    QueryParamsUtility.addResources(queryParams, resources, VideoResourceProperties);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Video[]>('items')
      );

    return data$;
  }

  private validateGetByIds(ids: string[], resources: VideoResourceProperties[]): void {
    DataValidator.validateCollection(ids, 'ids');
    DataValidator.validateCollection(resources, 'resources');
  }
}

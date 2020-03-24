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
import { VideoResource } from '../shared/enums/resource-properties/video-resource';
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

  getMostPopular(regionCode: RegionCode, pageArgs: PageArguments, resources: VideoResource[]):
    Observable<ServiceModel<Video[]>> {
    this.validateGetMostPopularArguments(regionCode, pageArgs, resources);

    const queryParams = {
      chart: 'mostPopular',
      regionCode: RegionCode[regionCode],
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.addResources(queryParams, resources, VideoResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Video[]>>(url.toString());

    return data$;
  }

  private validateGetMostPopularArguments(
    regionCode: RegionCode,
    pageArgs: PageArguments,
    resources: VideoResource[]
  ): void {
    DataValidator.nullOrUndefinied(regionCode, 'regionCode');
    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }

  getByIds(ids: string[], resources: VideoResource[], maxHeight?: number, maxWidth?: number): Observable<Video[]> {
    this.validateGetByIds(ids, resources);

    const queryParams = {
      id: ids.join(',')
    };
    this.tryAddMaxDimensions(queryParams, maxHeight, maxWidth);
    QueryParamsUtility.addResources(queryParams, resources, VideoResource);
    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Video[]>('items')
      );

    return data$;
  }

  private tryAddMaxDimensions(queryParams: any, maxHeight: number, maxWidth: number): void {
    if (maxHeight != null) {
      queryParams.maxHeight = maxHeight;
    }
    if (maxWidth != null) {
      queryParams.maxWidth = maxWidth;
    }
  }

  private validateGetByIds(ids: string[], resources: VideoResource[]): void {
    DataValidator.validateCollection(ids, 'ids');
    DataValidator.validateCollection(resources, 'resources');
  }
}

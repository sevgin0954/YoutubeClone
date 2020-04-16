import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Url } from '../shared/url';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Video } from '../models/video/video';
import { MainConstants } from '../shared/constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { VideoResource } from '../shared/enums/resource-properties/video-resource';
import { DataValidator } from '../shared/validation/data-validator';
import { RegionCode } from '../shared/enums/region-code';

const PATH = 'videos';
const MOST_POPULAR_FILTER = 'mostPopular';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient
  ) { }

  getById = (
    id: string,
    resources: VideoResource[],
    maxHeight?: number,
    maxWidth?: number
  ): Observable<ServiceModel<Video[]>> => {

    this.validateGetByIdsArguments([id], resources);

    const pageArgs = new PageArguments(1);
    const data$ = this.getByIds([id], pageArgs, resources, maxHeight, maxWidth);

    return data$;
  }

  getByIds = (
    ids: string[],
    pageArgs: PageArguments,
    resources: VideoResource[],
    maxHeight?: number,
    maxWidth?: number
  ): Observable<ServiceModel<Video[]>> => {

    this.validateGetByIdsArguments(ids, resources);

    const queryParams = {
      id: ids.join(','),
      maxResults: pageArgs.maxResults
    };
    this.tryAddMaxDimensions(queryParams, maxHeight, maxWidth);
    QueryParamsUtility.addResources(queryParams, resources, VideoResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Video[]>>(url.toString());

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

  private validateGetByIdsArguments(ids: string[], resources: VideoResource[]): void {
    DataValidator.validateCollection(ids, 'ids');
    DataValidator.validateCollection(resources, 'resources');
  }

  getMostPopular = (
    regionCode: RegionCode,
    pageArgs: PageArguments,
    resources: VideoResource[]
  ):
    Observable<ServiceModel<Video[]>> => {
    this.validateGetMostPopularArguments(regionCode, pageArgs, resources);

    const queryParams = {
      chart: MOST_POPULAR_FILTER,
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

  getByCategoryId = (
    categoryId: string,
    pageArgs: PageArguments,
    resources: VideoResource[]
  )
    :Observable<ServiceModel<Video[]>> => {
    this.validateGetByCategoryId(categoryId, resources);

    const queryParams = {
      chart: MOST_POPULAR_FILTER,
      videoCategoryId: categoryId,
      maxResults: pageArgs.maxResults,
    };
    QueryParamsUtility.addResources(queryParams, resources, VideoResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Video[]>>(url.toString());

    return data$;
  }

  private validateGetByCategoryId(categoryId: string, resources: VideoResource[]): void {
    DataValidator.validateString(categoryId, 'categoryId');
    DataValidator.validateCollection(resources, 'resources');
  }
}

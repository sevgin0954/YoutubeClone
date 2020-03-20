import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { Observable } from 'rxjs';
import { MainConstants } from '../shared/Constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResource } from '../shared/enums/resource-properties/channel-resource';
import { DataValidator } from '../shared/Validation/data-validator';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  getSubscriptions(
    pageArgs: PageArguments,
    resources: ChannelResource[]
  ): Observable<ServiceModel<Channel[]>> {

    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    this.validateResourceProperties(resources);

    const queryParams: any = {
      mine: 'true',
      maxResults: pageArgs.maxResults
    }
    QueryParamsUtility.addResources(queryParams, resources, ChannelResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, ['subscriptions'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  getByIds(
    ids: string[],
    pageArgs: PageArguments,
    resources: ChannelResource[]
  ): Observable<ServiceModel<Channel[]>> {
    this.validateGetByIdArguments(ids, resources);

    const queryParams: any = {
      id: ids.join(','),
      maxResults: pageArgs.maxResults.toString()
    };
    QueryParamsUtility.addResources(queryParams, resources, ChannelResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, ['channels'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  private validateGetByIdArguments(
    ids: string[],
    resourceProprties: ChannelResource[]
  ): void {
    this.validateIdsArgument(ids);
    this.validateResourceProperties(resourceProprties);
  }

  private validateIdsArgument(ids: string[]): void {
    const idsArgumentName = 'ids';
    DataValidator.nullOrUndefinied(ids, idsArgumentName);
    DataValidator.emptyCollection(ids, idsArgumentName);
  }

  private validateResourceProperties(resourceProprties: ChannelResource[]): void {
    DataValidator.nullOrUndefinied(resourceProprties, 'resourceProprties');
    DataValidator.emptyCollection(resourceProprties, 'resourceProprties');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { Observable } from 'rxjs';
import { MainConstants } from '../shared/Constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResourceProperties } from '../shared/enums/resource-properties/channel-resource-properties';
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
    resources: ChannelResourceProperties[]
  ): Observable<ServiceModel<Channel[]>> {

    this.validateResourceProperties(resources);

    const queryParams: any = {
      mine: 'true',
      maxResults: pageArgs.maxResults
    }
    QueryParamsUtility.addResources(queryParams, resources, ChannelResourceProperties);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, ['subscriptions'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  getByIds(
    ids: string[],
    pageArgs: PageArguments,
    resources: ChannelResourceProperties[]
  ): Observable<ServiceModel<Channel[]>> {
    this.validateGetByIdArguments(ids, resources);

    const queryParams: any = {
      id: ids.join(','),
      maxResults: pageArgs.maxResults.toString()
    };
    QueryParamsUtility.addResources(queryParams, resources, ChannelResourceProperties);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, ['channels'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  private validateGetByIdArguments(
    ids: string[],
    resourceProprties: ChannelResourceProperties[]
  ): void {
    this.validateIdsArgument(ids);
    this.validateResourceProperties(resourceProprties);
  }

  private validateIdsArgument(ids: string[]): void {
    const idsArgumentName = 'ids';
    DataValidator.nullOrUndefinied(ids, idsArgumentName);
    DataValidator.emptyCollection(ids, idsArgumentName);
  }

  private validateResourceProperties(resourceProprties: ChannelResourceProperties[]): void {
    DataValidator.nullOrUndefinied(resourceProprties, 'resourceProprties');
    DataValidator.emptyCollection(resourceProprties, 'resourceProprties');
  }
}

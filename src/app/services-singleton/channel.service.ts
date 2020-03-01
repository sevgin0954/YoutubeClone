import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { Observable } from 'rxjs';
import { MainConstants } from '../shared/Constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResourceProperties } from '../shared/enums/resource-properties/channel-resource-properties';
import { EnumUtility } from '../shared/utilities/enum-utility';
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
    resourceProprties: ChannelResourceProperties[]
  ): Observable<ServiceModel<Channel[]>> {

    this.validateSubscriptionArguments(pageArgs, resourceProprties);

    const part = EnumUtility.join(resourceProprties, ',', ChannelResourceProperties);
    const queryParams: any = {
      part: part,
      mine: 'true',
      maxResults: pageArgs.maxResults
    }
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, ['subscriptions'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  private validateSubscriptionArguments(
    pageArgs: PageArguments,
    resourceProprties: ChannelResourceProperties[]
  ): void {
    DataValidator.pageArguments(pageArgs, 'pageArgs');
    this.validateResourceProperties(resourceProprties);
  }

  getByIds(
    ids: string[],
    pageArgs: PageArguments,
    resourceProprties: ChannelResourceProperties[]
  ): Observable<ServiceModel<Channel[]>> {
    this.validateGetByIdArguments(ids, pageArgs, resourceProprties);

    const part = EnumUtility.join(resourceProprties, ',', ChannelResourceProperties);
    const queryParams: any = {
      part: part,
      id: ids.join(','),
      maxResults: pageArgs.maxResults.toString()
    };
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, ['channels'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  private validateGetByIdArguments(
    ids: string[],
    pageArgs: PageArguments,
    resourceProprties: ChannelResourceProperties[]
  ): void {
    this.validateIdsArgument(ids);
    DataValidator.pageArguments(pageArgs, 'pageArgs');
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

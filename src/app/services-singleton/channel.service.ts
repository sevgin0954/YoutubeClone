import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { Observable } from 'rxjs';
import { MainConstants } from '../shared/constants/main-constants';
import { PageArguments } from '../shared/arguments/page-arguments';
import { ChannelResource } from '../shared/enums/resource-properties/channel-resource';
import { DataValidator } from '../shared/validation/data-validator';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { pluck, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  getById(id: string, resources: ChannelResource[]): Observable<Channel> {
    const pageArgs = new PageArguments(1, undefined);
    const data$ = this.getByIds([id], pageArgs, resources).pipe(
      pluck('items'),
      map(items => items[0])
    );

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
    DataValidator.validateCollection(ids, 'ids');
    this.validateResourceProperties(resourceProprties);
  }

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

  private validateResourceProperties(resourceProprties: ChannelResource[]): void {
    DataValidator.nullOrUndefinied(resourceProprties, 'resourceProprties');
    DataValidator.emptyCollection(resourceProprties, 'resourceProprties');
  }
}

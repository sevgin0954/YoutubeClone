import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Url } from '../shared/url';
import { pluck, map } from 'rxjs/operators';
import { Subscription } from '../models/subscribption/subscription';
import { MainConstants } from '../shared/Constants/main-constants';
import { Config } from 'protractor';
import { SubscriptionResourceProperties } from '../shared/enums/resource-properties/subscription-resource-properties';
import { DataValidator } from '../shared/Validation/data-validator';
import { ServiceModel } from '../models/service-models/service-model';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { SubscriptionSnippetResourceId } from '../models/subscribption/subscription-snippet-resourceId';

const PATH = 'subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
    private http: HttpClient
  ) { }

  getById(channelId: string, resources: SubscriptionResourceProperties[]): Observable<Subscription> {
    this.validateArguments(channelId, resources);

    const queryParams: any = {
      forChannelId: channelId,
      mine: true
    };
    QueryParamsUtility.addResources(queryParams, resources, SubscriptionResourceProperties);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Subscription[]>>(url.toString())
      .pipe(
        pluck<ServiceModel<Subscription[]>, Subscription[]>('items'),
        map<any, Subscription>(data => data[0])
      );

    return data$;
  }

  subscribe(channelId: string, resources: SubscriptionResourceProperties[]): Observable<Subscription> {
    this.validateArguments(channelId, resources);

    const queryParams: any = {};
    QueryParamsUtility.addResources(queryParams, resources, SubscriptionResourceProperties);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);

    const resourceId: SubscriptionSnippetResourceId = {
      kind:"youtube#channel",
      channelId: channelId
    };
    const body = {
      snippet: {
        resourceId: resourceId
      }
    };
    const data$ = this.http.post<Subscription>(url.toString(), body);

    return data$;
  }

  private validateArguments(channelId: string, resources: SubscriptionResourceProperties[]): void {
    DataValidator.validateString(channelId, 'channelId');
    DataValidator.validateCollection(resources, 'resources');
  }

  unsubscribe(channelId: string): Observable<number> {
    DataValidator.validateString(channelId, 'channelId');

    const queryParams: any = {
      id: channelId
    };
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.delete<Config>(url.toString(), { observe: 'response' })
      .pipe(
        map(data => data.status)
      );

    return data$;
  }
}

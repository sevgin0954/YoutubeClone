import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Url } from '../shared/url';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { Subscription } from '../models/subscribption/subscription';
import { HttpConfigService } from './http-config.service';
import { Constants } from '../shared/constants';

const BASE_URL = Constants.BASE_URL + '/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
    private http: HttpClient,
    private httpConfigService: HttpConfigService
  ) { }

  getById(channelId: string): Observable<Subscription> {
    const queryParams: any = {
      part: 'snippet',
      forChannelId: channelId,
      mine: true
    };
    const url = new Url(BASE_URL, [], queryParams);
    const data$ = this.http.get<Subscription>(url.toString())
      .pipe(
        pluck('items'),
        map<any, Subscription>(data => data[0])
      );

    return data$;
  }

  subscribe(channelId: string): Observable<Subscription> {
    const queryParams: any = {
      part: 'snippet'
    };
    const url = new Url(BASE_URL, [], queryParams);

    const channel = {
      snippet: {
        resourceId: {
          kind:"youtube#channel",
          channelId: channelId
        }
      }
    };
    const data$ = this.http.post<Subscription>(url.toString(), channel).pipe(

    );

    return data$;
  }

  unsubscribe(channelId: string): Observable<number> {
    const queryParams: any = {
      id: channelId
    };
    const url = new Url(BASE_URL, [], queryParams);
    const data$ = this.httpConfigService.getConfigDeleteResponse(url.toString())
      .pipe(
        map(data => data.status)
      );

    return data$;
  }
}

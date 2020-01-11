import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../shared/url';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { Config } from 'protractor';
import { Subscription } from '../models/subscribption/subscription';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
    private http: HttpClient
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
    const data$ = this.getConfigDeleteResponse(url.toString())
      .pipe(
        map(data => data.status)
      );

    return data$;
  }

  // TODO: Reuse
  getConfigPostResponse(url: string, body: any): Observable<HttpResponse<Config>> {
    return this.http.post<Config>(url, body, { observe: 'response' });
  }

  // TODO: Reuse
  getConfigDeleteResponse(url: string): Observable<HttpResponse<Config>> {
    return this.http.delete<Config>(url, { observe: 'response' });
  }
}

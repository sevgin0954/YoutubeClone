import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  getSubscriptions(maxResults: number, pageToken: string): Observable<ServiceModel<Channel[]>> {
    const queryParams: any = {
      part: 'snippet',
      mine: 'true',
      maxResults: maxResults.toString()
    }
    this.addPageToken(queryParams, pageToken);

    const url = new Url(Constants.BASE_URL, ['subscriptions'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  getByIds(ids: string[], pageToken: string, maxResults: number): Observable<ServiceModel<Channel[]>> {
    const queryParams: any = {
      part: 'snippet,statistics,brandingSettings',
      id: ids.join(','),
      maxResults: maxResults.toString()
    };
    this.addPageToken(queryParams, pageToken);

    const url = new Url(Constants.BASE_URL, ['channels'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string) {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

import { Injectable } from '@angular/core';
import { Channel } from 'src/app/models/channel/channel';
import { ServiceModel } from 'src/app/models/service-models/service-model';
import { Url } from 'src/app/shared/url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO: Move to glabal constant
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
    private http: HttpClient
  ) { }

  // TODO: Slice the descripiton here
  getSubscriptions(maxResults: number, pageToken: string): Observable<ServiceModel<Channel>> {
    const queryParams: any = {
      part: 'snippet',
      mine: 'true',
      maxResults: maxResults.toString()
    }
    this.addPageToken(queryParams, pageToken);

    const url = new Url(BASE_URL, ['subscriptions'], queryParams);
    const data$ = this.http.get<ServiceModel<Channel>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string) {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

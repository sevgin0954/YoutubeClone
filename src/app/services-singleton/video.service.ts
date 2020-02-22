import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Url } from '../shared/url';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Video } from '../models/video/video';
import { pluck } from 'rxjs/operators';
import { Constants } from '../shared/constants';

const BASE_URL = Constants.BASE_URL + '/videos'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient
  ) { }

  getMostPopular(regionCode: string, maxResults: number, pageToken: string):
    Observable<ServiceModel<Video[]>> {
    const queryParams = {
      part: 'snippet,contentDetails,status,statistics,player,liveStreamingDetails,localizations',
      fields: '*',
      mine: 'true',
      chart: 'mostPopular',
      regionCode: regionCode,
      maxResults: maxResults.toString()
    };
    this.addPageToken(queryParams, pageToken);

    const url = new Url(BASE_URL, [], queryParams);
    const data$ = this.http.get<ServiceModel<Video[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string): void {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }

  getByIds(...ids: string[]): Observable<Video[]> {
    const queryParams = {
      part: 'snippet,contentDetails,statistics',
      id: ids.join(',')
    };
    const url = new Url(BASE_URL, [], queryParams);
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Video[]>('items')
      );

    return data$;
  }
}

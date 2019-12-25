import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Video } from '../models/video/video';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient
  ) { }

    // TODO: Slice the descripiton here
  getMostPopular(regionCode: string, maxResults: number, pageToken: string):
    Observable<ServiceModel<Video>> {
    const queryParams: any = {
      part: 'snippet,contentDetails,status,statistics,player,liveStreamingDetails,localizations',
      fields: '*',
      mine: 'true',
      chart: 'mostPopular',
      regionCode: regionCode,
      maxResults: maxResults.toString()
    }
    this.addPageToken(queryParams, pageToken);

    const url = new Url(BASE_URL, ['videos'], queryParams);
    const data$ = this.http.get<ServiceModel<Video>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string) {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

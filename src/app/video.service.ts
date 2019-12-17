import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from './url';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Video } from './models/video/video';
import { Channel } from './models/channel/channel';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const items = 'items';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient) { }

  getMostPopular(regionCode: string, maxResults: number): Observable<Video[]> {
    const url = new Url(BASE_URL, ['videos'], {
      part: 'snippet,contentDetails,status,statistics,player,liveStreamingDetails,localizations',
      fields: '*',
      mine: 'true',
      chart: 'mostPopular',
      regionCode: regionCode,
      maxResults: maxResults.toString()
    });
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Video[]>(items)
      );

    return data$;
  }

  getSubscriptions(maxResults: number): Observable<Channel[]> {
    const url = new Url(BASE_URL, ['subscriptions'], {
      part: 'snippet',
      mine: 'true',
      maxResults: maxResults.toString()
    });
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Channel[]>(items)
      );

      return data$;
  }
}

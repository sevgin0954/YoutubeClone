import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { Url } from './url';
import { Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Video } from './models/video/video';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const CLIENT_ID = '576498499876-u841pl14j9pdgemtlaqk1a6tjih8vb2c.apps.googleusercontent.com';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
    private serializer: UrlSerializer) { }

  getMostPopular(regionCode: string, maxResults: number): Observable<Video[]> {
    const url = new Url(BASE_URL, ['videos'], {
      part: 'snippet,contentDetails,status,' +
        'statistics,player,liveStreamingDetails,localizations',
      fields: '*',
      mine: 'true',
      chart: 'mostPopular',
      regionCode: regionCode,
      maxResults: maxResults.toString()
    });
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck<any, Video[]>('items'),
        //tap(data => console.log(data))
      );

    return data$;
  }
}

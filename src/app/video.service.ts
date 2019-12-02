import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { Url } from './url';
import { Observable } from 'rxjs';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const CLIENT_ID = '576498499876-u841pl14j9pdgemtlaqk1a6tjih8vb2c.apps.googleusercontent.com';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
    private serializer: UrlSerializer) { }

  getRecommended(): Observable<any> {
    const url = new Url(BASE_URL, ['activities'], {
      // key: CLIENT_ID,
      part: 'snippet',
      fields: '*',
      mine: 'true'
    });
    const data$ = this.http.get(url.toString());

    return data$;
  }
}

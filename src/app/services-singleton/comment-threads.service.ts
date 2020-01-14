import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceModel } from '../models/service-models/service-model';
import { Url } from '../shared/url';
import { Constants } from '../shared/constants';
import { CommentThread } from '../models/comment/comment-thread';

const BASE_URL = Constants.BASE_URL + '/commentThreads'

@Injectable({
  providedIn: 'root'
})
export class CommentThreadsService {

  constructor(
    private http: HttpClient
  ) { }

  getByVideoId(videoId: string, nextPageToken: string): Observable<ServiceModel<CommentThread[]>> {
    const queryParams = {
      part: 'snippet',
      videoId: videoId
    };
    this.addPageToken(queryParams, nextPageToken);

    const url = new Url(BASE_URL, [], queryParams);
    var data$ = this.http.get<ServiceModel<CommentThread[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string) {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service-models/service-model';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Url } from '../shared/url';
import { Comment } from '../models/comment/comment';

const BASE_URL = Constants.BASE_URL + '/comments'

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  getByParentId(parentId: string, nextPageToken: string): Observable<ServiceModel<Comment[]>> {
    const queryParams = {
      part: 'id,snippet',
      parentId: parentId
    };
    this.addPageToken(queryParams, nextPageToken);

    const url = new Url(BASE_URL, [], queryParams);
    var data$ = this.http.get<ServiceModel<Comment[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string) {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

import { Injectable } from '@angular/core';

import { ServiceModel } from '../models/service-models/service-model';
import { Playlist } from '../models/playlist/playlist';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../shared/constants';
import { Url } from '../shared/url';
import { Observable } from 'rxjs';

const PATH: string = 'playlists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  constructor(
    private http: HttpClient
  ) { }

  getByIds(ids: string[], pageToken: string, maxResults: number): Observable<ServiceModel<Playlist[]>> {
    const queryParams = {
      part: 'snippet,contentDetails',
      id: ids.join(','),
      maxResults: maxResults
    };
    this.addPageToken(queryParams, pageToken);
    const url = new Url(Constants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Playlist[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string): void {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

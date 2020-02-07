import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PlaylistItem } from '../models/playlist/playlist-item';
import { Constants } from '../shared/constants';
import { Url } from '../shared/url';
import { ServiceModel } from '../models/service-models/service-model';

const PATH = 'playlistItems';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  getById(playlistId: string, maxResults: number, pageToken: string):
    Observable<ServiceModel<PlaylistItem[]>> {
    const queryParams = {
      part: 'snippet,contentDetails',
      playlistId: playlistId,
      maxResults: maxResults
    };
    this.addPageToken(queryParams, pageToken);
    const url = new Url(Constants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<PlaylistItem[]>>(url.toString());

    return data$;
  }

  private addPageToken(queryParams: any, pageToken: string): void {
    if (pageToken) {
      queryParams.pageToken = pageToken;
    }
  }
}

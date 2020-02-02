import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PlaylistItem } from '../models/playlist/playlist-item';
import { Constants } from '../shared/constants';
import { Url } from '../shared/url';
import { pluck, map, tap } from 'rxjs/operators';

const PATH = 'playlistItems';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  getById(playlistId: string): Observable<PlaylistItem[]> {
    const queryParams = {
      part: 'snippet,contentDetails',
      playlistId: playlistId
    };
    const url = new Url(Constants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get(url.toString()).pipe(
      pluck<any, PlaylistItem[]>('items')
    );

    return data$;
  }
}

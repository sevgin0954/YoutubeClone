import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServiceModel } from '../models/service-models/service-model';
import { Playlist } from '../models/playlist/playlist';
import { MainConstants } from '../shared/constants/main-constants';
import { Url } from '../shared/url';
import { Observable } from 'rxjs';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';
import { QueryParamsUtility } from 'src/app/shared/utilities/query-params-utility';
import { DataValidator } from 'src/app/shared/validation/data-validator';
import { pluck, map } from 'rxjs/operators';

const PATH: string = 'playlists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
    private http: HttpClient
  ) { }

  getById(id: string, resources: PlaylistResource[]): Observable<Playlist> {
    const pageArgs = new PageArguments(1, undefined);
    const data$ = this.getByIds([id], pageArgs, resources).pipe(
      pluck('items'),
      map(playlists => playlists[0])
    );

    return data$;
  }

  getByIds(ids: string[], pageArgs: PageArguments, resources: PlaylistResource[])
    : Observable<ServiceModel<Playlist[]>> {

    this.validateGetByIdsArguments(ids, pageArgs, resources);

    const queryParams = {
      id: ids.join(','),
      maxResults: pageArgs.maxResults
    };

    QueryParamsUtility.addResources(queryParams, resources, PlaylistResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Playlist[]>>(url.toString());

    return data$;
  }

  private validateGetByIdsArguments(
    ids: string[],
    pageArgs: PageArguments,
    resources: PlaylistResource[]
  ): void {
    DataValidator.validateCollection(ids, 'ids');
    DataValidator.anyEmptyString(ids, 'ids');
    DataValidator.anyNullOrUndefined(ids, 'ids');

    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }
}

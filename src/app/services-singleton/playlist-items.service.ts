import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PlaylistItem } from '../models/playlist/playlist-item';
import { MainConstants } from '../shared/Constants/main-constants';
import { Url } from '../shared/url';
import { ServiceModel } from '../models/service-models/service-model';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { PageArguments } from '../shared/arguments/page-arguments';
import { PlaylistItemResource } from '../shared/enums/resource-properties/playlist-item-resource';
import { DataValidator } from '../shared/Validation/data-validator';

const PATH = 'playlistItems';

@Injectable({
  providedIn: 'root'
})
export class PlaylistItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getById(playlistId: string, pageArgs: PageArguments, resources: PlaylistItemResource[]):
    Observable<ServiceModel<PlaylistItem[]>> {

    this.validateArguments(playlistId, pageArgs, resources);

    const queryParams = {
      playlistId: playlistId,
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.addResources(queryParams, resources, PlaylistItemResource);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<PlaylistItem[]>>(url.toString());

    return data$;
  }

  private validateArguments(
    playlistId: string,
    pageArgs: PageArguments,
    resources: PlaylistItemResource[]
  ): void {
    DataValidator.emptyString(playlistId, 'playlistId');
    DataValidator.nullOrUndefinied(playlistId, 'playlistId');

    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PlaylistItem } from '../models/playlist/playlist-item';
import { MainConstants } from '../shared/Constants/main-constants';
import { Url } from '../shared/url';
import { ServiceModel } from '../models/service-models/service-model';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { PageArguments } from '../shared/arguments/page-arguments';
import { PlaylistItemResourceProperties } from '../shared/enums/resource-properties/playlist-item-resource-properties';
import { EnumUtility } from '../shared/utilities/enum-utility';
import { DataValidator } from '../shared/Validation/data-validator';

const PATH = 'playlistItems';

@Injectable({
  providedIn: 'root'
})
export class PlaylistItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getById(playlistId: string, pageArgs: PageArguments, resources: PlaylistItemResourceProperties[]):
    Observable<ServiceModel<PlaylistItem[]>> {

    this.validateArguments(playlistId, pageArgs, resources);

    const part = EnumUtility.join(resources, ',', PlaylistItemResourceProperties);
    const queryParams = {
      part: part,
      playlistId: playlistId,
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<PlaylistItem[]>>(url.toString());

    return data$;
  }

  private validateArguments(
    playlistId: string,
    pageArgs: PageArguments,
    resources: PlaylistItemResourceProperties[]
  ): void {
    DataValidator.emptyString(playlistId, 'playlistId');
    DataValidator.nullOrUndefinied(playlistId, 'playlistId');

    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }
}

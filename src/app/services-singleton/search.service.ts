import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PageArguments } from '../shared/arguments/page-arguments';
import { FilterArguments } from '../shared/arguments/search/filter-arguments';
import { Search } from '../models/search/search';
import { ServiceModel } from '../models/service-models/service-model';
import { Observable } from 'rxjs';
import { Url } from '../shared/url';
import { MainConstants } from '../shared/constants/main-constants';
import { QueryParamsUtility } from '../shared/utilities/query-params-utility';
import { SearchResource } from '../shared/enums/resource-properties/search-resource';

const PATH = 'search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getResults(
    query: string,
    pageArgs: PageArguments,
    filterArgs: FilterArguments = new FilterArguments()
  ): Observable<ServiceModel<Search[]>> {
    const queryParams = {
      q: query,
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.addResources(queryParams, [SearchResource.snippet], SearchResource);
    QueryParamsUtility.tryAddFromGetters(queryParams, filterArgs);
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    const data$ = this.http.get<ServiceModel<Search[]>>(url.toString());

    return data$;
  }

  getResultsByChannel(
    channelId: string,
    filterArgs: FilterArguments,
    pageArgs: PageArguments,
    query: string
  ) {

  }
}

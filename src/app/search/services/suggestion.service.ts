import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Url } from 'src/app/shared/url';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegionCode } from 'src/app/shared/enums/region-code';

@Injectable()
export class SuggestionService {

  constructor(
    private http: HttpClient
  ) { }

  getSuggestions(
    searchQuery: string,
    regionCode: RegionCode,
    maxResults: number
  ): Observable<string[]> {
    const queryParams = {
      client: 'firefox',
      ds: 'yt',
      max: maxResults,
      q: searchQuery,
      hl: RegionCode[regionCode]
    };
    const url = new Url(
      MainConstants.CORS_ANYWHERE_BASE_URL,
      [MainConstants.SUGGESTION_BASE_URL],
      queryParams
    );
    const data$ = this.http.get(url.toString()).pipe(
      map<any, string[]>(results => results[1])
    );

    return data$;
  }
}

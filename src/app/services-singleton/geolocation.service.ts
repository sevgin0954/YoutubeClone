import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegionCode } from '../shared/enums/region-code';
import { Observable } from 'rxjs';
import { MainConstants } from '../shared/Constants/main-constants';
import { Url } from '../shared/url';
import { pluck, map } from 'rxjs/operators';
import { SecurityConstants } from '../shared/constants/security-constants';

const COUNTRY_CODE_PROPERTY = 'country_code';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(
    private http: HttpClient
  ) { }

  getRegionCode(): Observable<RegionCode> {
    const url = new Url(MainConstants.APISTACK_BASE_URL, ['check'], {
      'access_key': SecurityConstants.IPSTACK_API_KEY
    });
    const headers = {};
    headers[MainConstants.SKIP_INTERCEPTOR_HEADER] = '';
    const data$ = this.http.get<JSON>(url.toString(), { headers: headers }).pipe(
      pluck<JSON, string>(COUNTRY_CODE_PROPERTY),
      map<string, RegionCode>(cc => RegionCode[cc])
    );

    return data$;
  }
}

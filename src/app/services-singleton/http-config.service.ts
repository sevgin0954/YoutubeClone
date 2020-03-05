import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Config } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {

  constructor(
    private http: HttpClient
  ) { }

  getConfigPostResponse(url: string, body: any): Observable<HttpResponse<Config>> {
    return this.http.post<Config>(url, body, { observe: 'response' });
  }

  getConfigDeleteResponse(url: string): Observable<HttpResponse<Config>> {
    return this.http.delete<Config>(url, { observe: 'response' });
  }
}

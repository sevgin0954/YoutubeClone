import { Injectable } from '@angular/core';

import { ServiceModel } from '../../models/service-models/service-model';
import { Observable } from 'rxjs';
import { MainConstants } from '../../shared/Constants/main-constants';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../shared/url';
import { Comment } from '../../models/comment/comment';
import { QueryParamsUtility } from 'src/app/shared/utilities/query-params-utility';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';

const PATH = 'comments'

@Injectable()
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  getByParentId(
    parentId: string,
    pageArgs: PageArguments,
    resources: 
  ): Observable<ServiceModel<Comment[]>> {
    const queryParams = {
      part: 'id,snippet',
      parentId: parentId
    };
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams);
    var data$ = this.http.get<ServiceModel<Comment[]>>(url.toString());

    return data$;
  }
}

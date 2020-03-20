import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServiceModel } from '../../models/service-models/service-model';
import { Observable } from 'rxjs';
import { MainConstants } from '../../shared/Constants/main-constants';
import { Url } from '../../shared/url';
import { Comment } from '../../models/comment/comment';
import { QueryParamsUtility } from 'src/app/shared/utilities/query-params-utility';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { CommentResource } from 'src/app/shared/enums/resource-properties/comment-resource';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

const PATH = 'comments'

@Injectable()
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  getByParentId(
    parentId: string,
    pageArgs: PageArguments,
    resources: CommentResource[]
  ): Observable<ServiceModel<Comment[]>> {

    this.validateGetByParentIdArgument(parentId, pageArgs, resources);

    const queryParams = {
      parentId: parentId,
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);
    QueryParamsUtility.addResources(queryParams, resources, CommentResource);

    const url = new Url(MainConstants.YOUTUBE_BASE_URL, [PATH], queryParams);
    var data$ = this.http.get<ServiceModel<Comment[]>>(url.toString());

    return data$;
  }

  private validateGetByParentIdArgument(
    parentId: string,
    pageArgs: PageArguments,
    resources: CommentResource[]
  ): void {
    DataValidator.validateString(parentId, 'parentId');
    DataValidator.nullOrUndefinied(pageArgs, 'pageArgs');
    DataValidator.validateCollection(resources, 'resources');
  }
}

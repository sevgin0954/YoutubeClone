import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ServiceModel } from '../../models/service-models/service-model';
import { Url } from '../../shared/url';
import { MainConstants } from '../../shared/constants/main-constants';
import { CommentThread } from '../../models/comment/comment-thread';
import { CommentThreadOrder } from '../../shared/enums/comment-thread-order';
import { PageArguments } from '../../shared/arguments/page-arguments';
import { QueryParamsUtility } from '../../shared/utilities/query-params-utility';
import { DataValidator } from '../../shared/validation/data-validator';

const BASE_URL = MainConstants.YOUTUBE_BASE_URL + '/commentThreads';

@Injectable()
export class CommentThreadsService {

  constructor(
    private http: HttpClient
  ) { }

  getByVideoId(videoId: string, order: CommentThreadOrder, pageArgs: PageArguments):
  Observable<ServiceModel<CommentThread[]>> {

    this.validateArguments(videoId, order);

    const queryParams = {
      part: 'snippet',
      videoId: videoId,
      order: CommentThreadOrder[order],
      maxResults: pageArgs.maxResults
    };
    QueryParamsUtility.tryAddPageToken(queryParams, pageArgs.pageToken);

    const url = new Url(BASE_URL, [], queryParams);
    var data$ = this.http.get<ServiceModel<CommentThread[]>>(url.toString());

    return data$;
  }

  private validateArguments(videoId: string, order: CommentThreadOrder): void {
    this.validateVideoId(videoId);
    DataValidator.nullOrUndefinied(order, 'order');
  }

  private validateVideoId(videoId: string): void {
    const argumentName = 'videoId';
    DataValidator.nullOrUndefinied(videoId, argumentName);
    DataValidator.emptyString(videoId, argumentName);
  }
}

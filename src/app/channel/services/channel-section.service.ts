import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ChannelSection } from '../../models/channel-section/channel-section';
import { Url } from '../../shared/url';
import { MainConstants } from '../../shared/Constants/main-constants';
import { pluck } from 'rxjs/operators';
import { ChannelSectionResource } from 'src/app/shared/enums/resource-properties/channel-section-resource';
import { QueryParamsUtility } from 'src/app/shared/utilities/query-params-utility';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

const PATH = 'channelSections';

@Injectable()
export class ChannelSectionService {

  constructor(
    private http: HttpClient
  ) { }

  getByChannelId(
    channelId: string,
    resources: ChannelSectionResource[]
  ): Observable<ChannelSection[]> {

    DataValidator.validateString(channelId, 'channelId');
    DataValidator.validateCollection(resources, 'resources');

    const queryParams = {
      channelId: channelId
    };
    QueryParamsUtility.addResources(queryParams, resources, ChannelSectionResource);
    const url = new Url(MainConstants.BASE_URL, [PATH], queryParams)
    const data$ = this.http.get(url.toString()).pipe(
      pluck<any, ChannelSection[]>('items')
    );

    return data$;
  }
}

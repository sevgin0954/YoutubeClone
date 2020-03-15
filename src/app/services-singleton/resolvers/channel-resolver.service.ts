import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Channel } from 'src/app/models/channel/channel';
import { Observable } from 'rxjs';
import { ChannelService } from '../channel.service';
import { map } from 'rxjs/operators';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

@Injectable({
  providedIn: 'root'
})
export class ChannelResolverService implements Resolve<Channel> {

  constructor(
    private channelService: ChannelService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
    const channelId: string = route.params['id'];

    DataValidator.emptyString(channelId, 'channelId');

    const pageArgs = new PageArguments(1, undefined);
    const resourceProprties = [
      ChannelResource.brandingSettings,
      ChannelResource.snippet,
      ChannelResource.statistics,
    ];
    const channel$ = this.channelService.getByIds([channelId], pageArgs, resourceProprties)
      .pipe(
        map<any, Channel>(data => data.items[0])
      );

    return channel$;
  }
}

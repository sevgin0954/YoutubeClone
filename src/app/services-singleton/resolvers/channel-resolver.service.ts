import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Channel } from 'src/app/models/channel/channel';
import { Observable } from 'rxjs';
import { ChannelService } from '../channel.service';
import { map } from 'rxjs/operators';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResourceProperties } from 'src/app/shared/enums/resource-properties/channel-resource-properties';

@Injectable({
  providedIn: 'root'
})
export class ChannelResolverService implements Resolve<Channel> {

  constructor(
    private channelService: ChannelService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
    const channelId = route.params['id'];
    const pageArgs = new PageArguments(1, null);
    const resourceProprties = [ChannelResourceProperties.snippet];
    const channel$ = this.channelService.getByIds([channelId], pageArgs, resourceProprties)
      .pipe(
        map<any, Channel>(data => data.items[0])
      );

    return channel$;
  }
}

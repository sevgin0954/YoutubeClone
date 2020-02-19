import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Channel } from 'src/app/models/channel/channel';
import { Observable } from 'rxjs';
import { ChannelService } from '../channel.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChannelResolverService implements Resolve<Channel> {

  constructor(
    private channelService: ChannelService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Channel> {
    const channelId = route.params['id'];
    const channel$ = this.channelService.getByIds([channelId], null ,1).pipe(
      map<any, Channel>(data => data.items[0])
    );

    return channel$;
  }
}

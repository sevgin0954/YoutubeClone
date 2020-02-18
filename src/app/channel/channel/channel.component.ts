import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChannelService } from 'src/app/services-singleton/channel.service';
import { Channel } from 'src/app/models/channel/channel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

  channel$: Observable<Channel>

  constructor(
    private channelService: ChannelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const channelId = this.route.snapshot.params['id'];
    this.channel$ = this.channelService.getByIds(channelId).pipe(
      map<any, Channel>(data => data[0])
    );
  }
}

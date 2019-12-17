import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';
import { Channel } from '../models/channel/channel';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  baseChannelUrl: string = 'https://www.youtube.com/user/';
  subsciptions$: Observable<Channel[]>;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    const maxResults = 50;
    this.subsciptions$ = this.videoService.getSubscriptions(maxResults);
  }

}

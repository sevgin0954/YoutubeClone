import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  recommendedVideos: Observable<any>;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.recommendedVideos = this.videoService.getRecommended();
    this.recommendedVideos.subscribe(data => {
      console.log(data)
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoService } from 'src/app/services-singleton/video.service';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-videos.component.html',
  styleUrls: ['./category-videos.component.scss']
})
export class CategoryVideosComponent implements OnInit {

  categoryId$: Observable<string>;
  loadVideosCallback: Function = this.videoService.getByCategoryId;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryId$ = this.route.params
      .pipe(
        pluck('id')
      );
  }
}

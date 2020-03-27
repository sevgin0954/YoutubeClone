import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService } from 'src/app/services-singleton/video.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-video.component.html',
  styleUrls: ['./category-video.component.scss']
})
export class CategoryVideoComponent implements OnInit {

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

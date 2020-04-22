import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoService } from 'src/app/services-singleton/video.service';
import { loadVideosCallback } from 'src/app/types';
import { MainConstants } from 'src/app/shared/constants/main-constants';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-videos.component.html',
  styleUrls: ['./category-videos.component.scss']
})
export class CategoryVideosComponent implements OnInit {

  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;
  title: string;
  loadVideosCallback: loadVideosCallback;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const categoryName = this.route.snapshot.params['name'];
    const regionCode = this.route.snapshot.params['region'];
    const categoryId = this.route.snapshot.params['id'];

    this.loadVideosCallback = (pageArgs, resources) => this.videoService
      .getByCategoryId(categoryId, pageArgs, resources, regionCode);

    this.title = `Videos in ${categoryName} category`;
  }
}

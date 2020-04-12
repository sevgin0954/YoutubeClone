import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { VideoService } from 'src/app/services-singleton/video.service';
import { loadVideosCallback } from 'src/app/types';
import { MainConstants } from 'src/app/shared/Constants/main-constants';

@Component({
  selector: 'app-category-video',
  templateUrl: './category-videos.component.html',
  styleUrls: ['./category-videos.component.scss']
})
export class CategoryVideosComponent implements OnInit {

  categoryId: string;
  mainContentId = MainConstants.SKIP_TO_ELEMENT_ID;
  title: string;
  loadVideosCallback: loadVideosCallback = this.videoService.getByCategoryId;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    const categoryName = this.route.snapshot.params['name'];

    this.title = `Videos in ${categoryName} category`;
  }
}

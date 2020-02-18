import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoInfoComponent } from './video-info/video-info.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';



@NgModule({
  declarations: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ]
})
export class VideoMiniModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { VideoInfoComponent } from './video-info/video-info.component';



@NgModule({
  declarations: [
    VideoThumbnailComponent,
    VideoInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    VideoThumbnailComponent,
    VideoInfoComponent
  ]
})
export class VideoMiniModule { }

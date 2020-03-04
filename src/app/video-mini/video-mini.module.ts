import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoInfoComponent } from './video-info/video-info.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ]
})
export class VideoMiniModule { }

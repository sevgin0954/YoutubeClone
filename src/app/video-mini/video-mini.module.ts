import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoInfoComponent } from './video-info/video-info.component';
import { VideoThumbnailComponent } from './video-thumbnail/video-thumbnail.component';
import { TextModule } from '../text/text.module';

@NgModule({
  declarations: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TextModule
  ],
  exports: [
    VideoInfoComponent,
    VideoThumbnailComponent,
  ]
})
export class VideoMiniModule { }

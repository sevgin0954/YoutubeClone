import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosComponent } from './videos/videos.component';
import { SharedModule } from '../shared/shared.module';
import { VideoMiniModule } from '../video-mini/video-mini.module';

@NgModule({
  declarations: [
    VideosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoMiniModule
  ],
  exports: [
    VideosComponent
  ]
})
export class VideosModule { }

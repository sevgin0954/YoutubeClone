import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoInfoComponent } from './components/video-info/video-info.component';
import { VideoThumbnailComponent } from './components/video-thumbnail/video-thumbnail.component';
import { TextModule } from '../text/text.module';
import { VideoMiniComponent } from './components/video-mini/video-mini.component';

@NgModule({
  declarations: [
    VideoInfoComponent,
    VideoThumbnailComponent,
    VideoMiniComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TextModule
  ],
  exports: [
    VideoInfoComponent,
    VideoThumbnailComponent,
    VideoMiniComponent
  ]
})
export class VideoMiniModule { }

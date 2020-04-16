import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VideoInfoComponent } from './components/video-info/video-info.component';
import { VideoThumbnailComponent } from './components/video-thumbnail/video-thumbnail.component';
import { TextModule } from '../text/text.module';
import { VideoFullComponent } from './components/video-full/video-full.component';

@NgModule({
  declarations: [
    VideoInfoComponent,
    VideoThumbnailComponent,
    VideoFullComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TextModule
  ],
  exports: [
    VideoInfoComponent,
    VideoThumbnailComponent,
    VideoFullComponent
  ]
})
export class VideoMiniModule { }

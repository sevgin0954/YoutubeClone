import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChannelMiniComponent } from './components/channel-mini/channel-mini.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { TextModule } from '../text/text.module';

@NgModule({
  declarations: [
    ChannelMiniComponent,
    LoadingComponent,
    LoadingElementsComponent,
    VideosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VideoMiniModule,
    TextModule
  ],
  exports: [
    ChannelMiniComponent,
    LoadingComponent,
    LoadingElementsComponent,
    VideosComponent
  ]
})
export class SharedModule { }

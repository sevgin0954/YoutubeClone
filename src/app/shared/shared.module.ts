import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { VideosComponent } from './components/videos/videos.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { TextModule } from '../text/text.module';
import { OffsetHeaderComponent } from './components/offset-header/offset-header.component';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingElementsComponent,
    VideosComponent,
    OffsetHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    VideoMiniModule,
    TextModule
  ],
  exports: [
    LoadingComponent,
    LoadingElementsComponent,
    VideosComponent,
    OffsetHeaderComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { TextModule } from '../text/text.module';
import { OffsetHeaderComponent } from './components/offset-header/offset-header.component';
import { AriaPressedDirective } from './directives/aria-pressed.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    LoadingElementsComponent,
    OffsetHeaderComponent,
    AriaPressedDirective
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
    OffsetHeaderComponent,
    AriaPressedDirective
  ]
})
export class SharedModule { }

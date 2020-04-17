import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaylistThumbnailComponent } from './components/playlist-thumbnail/playlist-thumbnail.component';

@NgModule({
  declarations: [
    PlaylistThumbnailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PlaylistThumbnailComponent
  ]
})
export class PlaylistMiniModule { }

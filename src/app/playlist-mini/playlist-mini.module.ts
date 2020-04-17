import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaylistThumbnailComponent } from './components/playlist-thumbnail/playlist-thumbnail.component';
import { PlaylistMiniComponent } from './components/playlist-mini/playlist-mini.component';
import { PlaylistInfoComponent } from './components/playlist-info/playlist-info.component';

@NgModule({
  declarations: [
    PlaylistThumbnailComponent,
    PlaylistMiniComponent,
    PlaylistInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PlaylistThumbnailComponent,
    PlaylistMiniComponent,
    PlaylistInfoComponent
  ]
})
export class PlaylistMiniModule { }

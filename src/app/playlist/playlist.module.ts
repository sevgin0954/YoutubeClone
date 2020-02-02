import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleChannelsPlaylistComponent } from './multiple-channels-playlist/multiple-channels-playlist.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';
import { MultiplePlaylistsComponent } from './multiple-playlists/multiple-playlists.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';

@NgModule({
  declarations: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent,
    MultiplePlaylistsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VideoMiniModule
  ],
  exports: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent
  ]
})
export class PlaylistModule { }

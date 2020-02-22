import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleChannelsPlaylistComponent } from './multiple-channels-playlist/multiple-channels-playlist.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';
import { MultiplePlaylistsComponent } from './multiple-playlists/multiple-playlists.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { ArrowDisplayButtonService } from './services/arrow-display-button.service';
import { PlaylistElementService } from './services/playlist-element.service';
import { PlaylistButtonsComponent } from './playlist-buttons/playlist-buttons.component';
import { RouterModule } from '@angular/router';
import { ArrowClickButtonService } from './services/arrow-click-button.service';

@NgModule({
  declarations: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent,
    MultiplePlaylistsComponent,
    PlaylistButtonsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    VideoMiniModule
  ],
  providers: [
    ArrowDisplayButtonService,
    PlaylistElementService,
    ArrowClickButtonService
  ],
  exports: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent,
    PlaylistButtonsComponent,
    MultiplePlaylistsComponent
  ]
})
export class PlaylistModule { }

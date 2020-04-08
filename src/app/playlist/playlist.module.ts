import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MultipleChannelsPlaylistComponent } from './multiple-channels-playlist/multiple-channels-playlist.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';
import { MultiplePlaylistsComponent } from './multiple-playlists/multiple-playlists.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { ArrowDisplayButtonService } from './services/arrow-display-button.service';
import { PlaylistButtonsComponent } from './playlist-buttons/playlist-buttons.component';
import { ArrowClickButtonService } from './services/arrow-click-button.service';
import { PlaylistsService } from './services/playlists.service';
import { MultipleChannelsPlaylistTemplateComponent } from './multiple-channels-playlist-template/multiple-channels-playlist-template.component';
import { MultiplePlaylistsTemplateComponent } from './multiple-playlists-template/multiple-playlists-template.component';
import { SinglePlaylistTemplateComponent } from './single-playlist-template/single-playlist-template.component';
import { PlaylistElementService } from './services/playlist-element.service';

@NgModule({
  declarations: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent,
    MultiplePlaylistsComponent,
    PlaylistButtonsComponent,
    MultipleChannelsPlaylistTemplateComponent,
    MultiplePlaylistsTemplateComponent,
    SinglePlaylistTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    VideoMiniModule
  ],
  providers: [
    ArrowDisplayButtonService,
    ArrowClickButtonService,
    PlaylistsService,
    PlaylistElementService
  ],
  exports: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent,
    PlaylistButtonsComponent,
    MultiplePlaylistsComponent
  ]
})
export class PlaylistModule { }

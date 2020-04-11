import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { ArrowDisplayButtonService } from './services/arrow-display-button.service';
import { ArrowClickButtonService } from './services/arrow-click-button.service';
import { PlaylistsService } from './services/playlists.service';
import { MultipleChannelsPlaylistTemplateComponent } from './components/multiple-channels-playlist/multiple-channels-playlist.component';
import { MultiplePlaylistsTemplateComponent } from './components/multiple-playlists-playlist/multiple-playlists-playlist.component';
import { PlaylistElementService } from './services/playlist-element.service';
import { SinglePlaylistSectionComponent } from './single-playlist-section/single-playlist-section.component';
import { MultipleChannelsSectionComponent } from './multiple-channels-section/multiple-channels-section.component';
import { PlaylistButtonsComponent } from './playlist-buttons/playlist-buttons.component';
import { MultiplePlaylistsSectionComponent } from './multiple-playlists-section/multiple-playlists-section.component';
import { SinglePlaylistTemplateComponent } from './components/single-playlist-playlist/single-playlist-playlist.component';

@NgModule({
  declarations: [
    MultipleChannelsSectionComponent,
    SinglePlaylistSectionComponent,
    MultiplePlaylistsSectionComponent,
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
    MultipleChannelsSectionComponent,
    SinglePlaylistSectionComponent,
    PlaylistButtonsComponent,
    MultiplePlaylistsSectionComponent
  ]
})
export class PlaylistModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { ArrowDisplayButtonService } from './services/arrow-display-button.service';
import { ArrowClickButtonService } from './services/arrow-click-button.service';
import { PlaylistElementService } from './services/playlist-element.service';
import { SinglePlaylistSectionComponent } from './single-playlist-section/single-playlist-section.component';
import { MultipleChannelsSectionComponent } from './multiple-channels-section/multiple-channels-section.component';
import { PlaylistButtonsComponent } from './playlist-buttons/playlist-buttons.component';
import { MultiplePlaylistsSectionComponent } from './multiple-playlists-section/multiple-playlists-section.component';
import { ChannelMiniModule } from '../channel-mini/channel-mini.module';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistHeaderComponent } from './components/single-playlist-section-header/single-playlist-section-header.component';
import { PlaylistItemsService } from './services/playlist-items.service';

@NgModule({
  declarations: [
    MultipleChannelsSectionComponent,
    SinglePlaylistSectionComponent,
    MultiplePlaylistsSectionComponent,
    PlaylistButtonsComponent,
    PlaylistComponent,
    PlaylistHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    VideoMiniModule,
    ChannelMiniModule
  ],
  providers: [
    ArrowDisplayButtonService,
    ArrowClickButtonService,
    PlaylistElementService,
    PlaylistItemsService
  ],
  exports: [
    MultipleChannelsSectionComponent,
    SinglePlaylistSectionComponent,
    PlaylistButtonsComponent,
    MultiplePlaylistsSectionComponent
  ]
})
export class PlaylistModule { }

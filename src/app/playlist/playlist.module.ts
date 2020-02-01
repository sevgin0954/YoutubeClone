import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleChannelsPlaylistComponent } from './multiple-channels-playlist/multiple-channels-playlist.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePlaylistComponent } from './single-playlist/single-playlist.component';

@NgModule({
  declarations: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MultipleChannelsPlaylistComponent,
    SinglePlaylistComponent
  ]
})
export class PlaylistModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChannelComponent } from './channel/channel.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistSectionModule } from '../playlist-section/playlist-section.module';
import { ChannelSectionsComponent } from './channel-sections/channel-sections.component';
import { ChannelResolverService } from '../services-singleton/resolvers/channel-resolver.service';
import { ChannelSectionService } from './services/channel-section.service';
import { ChannelImageComponent } from './components/channel-image/channel-image.component';
import { ChannelMiniModule } from '../channel-mini/channel-mini.module';

const routes: Routes = [
  { path: ':id', component: ChannelComponent, resolve: { channel: ChannelResolverService } }
];

@NgModule({
  declarations: [
    ChannelComponent,
    ChannelSectionsComponent,
    ChannelImageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PlaylistSectionModule,
    CommonModule,
    ChannelMiniModule
  ],
  providers: [
    ChannelSectionService
  ]
})
export class ChannelModule { }

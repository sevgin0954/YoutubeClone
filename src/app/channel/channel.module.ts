import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChannelComponent } from './channel/channel.component';
import { SharedModule } from '../shared/shared.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { ChannelSectionsComponent } from './channel-sections/channel-sections.component';
import { ChannelResolverService } from '../services-singleton/resolvers/channel-resolver.service';

const routes: Routes = [
  { path: ':id', component: ChannelComponent, resolve: { channel: ChannelResolverService } }
];

@NgModule({
  declarations: [
    ChannelComponent,
    ChannelSectionsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PlaylistModule,
    CommonModule
  ]
})
export class ChannelModule { }

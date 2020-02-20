import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TextRevealComponent } from './components/text-reveal/text-reveal.component';
import { ChannelMiniComponent } from './components/channel-mini/channel-mini.component';
import { LoadingComponent } from './compoentns/loading/loading.component';

@NgModule({
  declarations: [
    TextRevealComponent,
    ChannelMiniComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TextRevealComponent,
    ChannelMiniComponent,
    LoadingComponent
  ]
})
export class SharedModule { }

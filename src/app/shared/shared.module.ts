import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TextRevealComponent } from './components/text-reveal/text-reveal.component';
import { ChannelMiniComponent } from './components/channel-mini/channel-mini.component';

@NgModule({
  declarations: [
    TextRevealComponent,
    ChannelMiniComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TextRevealComponent,
    ChannelMiniComponent
  ]
})
export class SharedModule { }

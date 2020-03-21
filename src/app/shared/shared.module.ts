import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TextRevealComponent } from './components/text-reveal/text-reveal.component';
import { ChannelMiniComponent } from './components/channel-mini/channel-mini.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingElementsComponent } from './components/loading-elements/loading-elements.component';

@NgModule({
  declarations: [
    TextRevealComponent,
    ChannelMiniComponent,
    LoadingComponent,
    LoadingElementsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TextRevealComponent,
    ChannelMiniComponent,
    LoadingComponent,
    LoadingElementsComponent
  ]
})
export class SharedModule { }

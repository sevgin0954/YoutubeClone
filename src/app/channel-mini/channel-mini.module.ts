import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChannelMiniComponent } from './components/channel-mini/channel-mini.component';
import { ChannelBannerComponent } from './components/channel-banner/channel-banner.component';
import { ChannelSubscribersInfoComponent } from './components/channel-subscribers-info/channel-subscribers-info.component';
import { ChannelSubscribeButtonComponent } from './channel-subscribe-button/channel-subscribe-button.component';



@NgModule({
  declarations: [
    ChannelMiniComponent,
    ChannelBannerComponent,
    ChannelSubscribersInfoComponent,
    ChannelSubscribeButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ChannelMiniComponent,
    ChannelBannerComponent,
    ChannelSubscribersInfoComponent,
    ChannelSubscribeButtonComponent
  ]
})
export class ChannelMiniModule { }

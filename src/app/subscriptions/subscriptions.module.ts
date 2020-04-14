import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChannelsComponent } from './channels/channels.component';
import { TextModule } from '../text/text.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: ChannelsComponent }
];

@NgModule({
  declarations: [
    ChannelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TextModule,
  ]
})
export class SubscriptionsModule { }

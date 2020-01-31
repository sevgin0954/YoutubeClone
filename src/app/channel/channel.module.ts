import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './channel/channel.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: ':id', component: ChannelComponent }
];

@NgModule({
  declarations: [
    ChannelComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ChannelModule { }

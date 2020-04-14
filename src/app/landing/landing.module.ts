import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostPopularComponent } from './most-popular/most-popular.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: MostPopularComponent }
];

@NgModule({
  declarations: [
    MostPopularComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MostPopularComponent
  ]
})
export class LandingModule { }

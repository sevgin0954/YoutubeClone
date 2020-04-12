import { NgModule } from '@angular/core';

import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    NavbarSideComponent,
    NavbarTopComponent,
    NavbarBottomComponent
  ],
  imports: [
    AppRoutingModule
  ],
  exports: [
    NavbarBottomComponent,
    NavbarSideComponent,
    NavbarTopComponent
  ]
})
export class NavbarModule { }

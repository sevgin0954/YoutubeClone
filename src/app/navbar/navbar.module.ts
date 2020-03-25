import { NgModule } from '@angular/core';

import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { AppRoutingModule } from '../app-routing.module';
import { NavbarMenusComponent } from './navbar-menus/navbar-menus.component';

@NgModule({
  declarations: [
    NavbarSideComponent,
    NavbarTopComponent,
    NavbarBottomComponent,
    NavbarMenusComponent
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

import { NgModule } from '@angular/core';

import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { AppRoutingModule } from '../app-routing.module';
import { SearchModule } from '../search/search.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarSideComponent,
    NavbarTopComponent,
    NavbarBottomComponent,
    SearchBarComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    SearchModule
  ],
  exports: [
    NavbarBottomComponent,
    NavbarSideComponent,
    NavbarTopComponent
  ]
})
export class NavbarModule { }

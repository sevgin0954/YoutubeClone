import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { NavbarBottomComponent } from './navbar-bottom/navbar-bottom.component';
import { AppRoutingModule } from '../app-routing.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SuggestionService } from './services/suggestion.service';

@NgModule({
  declarations: [
    NavbarSideComponent,
    NavbarTopComponent,
    NavbarBottomComponent,
    SearchBarComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    SuggestionService
  ],
  exports: [
    NavbarBottomComponent,
    NavbarSideComponent,
    NavbarTopComponent
  ]
})
export class NavbarModule { }

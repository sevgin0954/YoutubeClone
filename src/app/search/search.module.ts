import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { SuggestionService } from './services/suggestion.service';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultComponent
  ],
  providers: [
    SuggestionService
  ]
  ,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchModule { }

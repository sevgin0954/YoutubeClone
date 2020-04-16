import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { SuggestionService } from './services/suggestion.service';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { VideoMiniModule } from '../video-mini/video-mini.module';

@NgModule({
  declarations: [
    SearchBarComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VideoMiniModule
  ],
  providers: [
    SuggestionService
  ],
  exports: [
    SearchBarComponent
  ]
})
export class SearchModule { }

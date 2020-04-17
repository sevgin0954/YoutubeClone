import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SuggestionService } from './services/suggestion.service';
import { VideoMiniModule } from '../video-mini/video-mini.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RouteConstants } from '../shared/constants/route-constants';
import { SharedModule } from '../shared/shared.module';
import { SearchElementsComponent } from './search-elements/search-elements.component';
import { ChannelMiniModule } from '../channel-mini/channel-mini.module';
import { PlaylistMiniModule } from '../playlist-mini/playlist-mini.module';

const routes: Routes = [
  { path: `${RouteConstants.SEARCH}/:query`, component: SearchResultsComponent }
];

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchElementsComponent
  ],
  imports: [
    ChannelMiniModule,
    CommonModule,
    PlaylistMiniModule,
    RouterModule.forChild(routes),
    SharedModule,
    VideoMiniModule,
  ],
  providers: [
    SuggestionService
  ],
  exports: []
})
export class SearchModule { }

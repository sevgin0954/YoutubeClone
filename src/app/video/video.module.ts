import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoComponent } from './video/video.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';
import { Routes, RouterModule } from '@angular/router';
import { VideoRatingService } from './services/video-rating.service';
import { YoutubeIframeService } from './services/youtube-iframe.service';
import { VideoDescriptionComponent } from './video-description/video-description.component';
import { VideoResolverService } from '../services-singleton/resolvers/video-resolver.service';

const routes: Routes = [
  { path: ':id', component: VideoComponent, resolve: { video: VideoResolverService } }
];

@NgModule({
  declarations: [
    VideoComponent,
    VideoCommentsComponent,
    VideoDescriptionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CommentModule
  ],
  providers: [
    VideoRatingService,
    YoutubeIframeService
  ]
})
export class VideoModule { }

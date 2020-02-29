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
import { VideoHeaderComponent } from './video-header/video-header.component';
import { CommentThreadsService } from './services/comment-threads.service';

const routes: Routes = [
  { path: ':id', component: VideoComponent, resolve: { video: VideoResolverService } }
];

@NgModule({
  declarations: [
    VideoComponent,
    VideoCommentsComponent,
    VideoDescriptionComponent,
    VideoHeaderComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CommentModule
  ],
  providers: [
    CommentThreadsService,
    VideoRatingService,
    YoutubeIframeService
  ]
})
export class VideoModule { }

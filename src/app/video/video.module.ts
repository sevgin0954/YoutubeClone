import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { VideoCommentsComponent } from './video-comments/video-comments.component';
import { SharedModule } from '../shared/shared.module';
import { CommentModule } from '../comment/comment.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: ':id', component: VideoComponent }
];

@NgModule({
  declarations: [
    VideoComponent,
    VideoCommentsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    CommentModule
  ]
})
export class VideoModule { }

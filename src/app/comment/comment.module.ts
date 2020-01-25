import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentRepliesComponent } from './comment-replies/comment-replies.component';
import { CommentComponent } from './comment/comment.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CommentComponent,
    CommentRepliesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CommentComponent,
    CommentRepliesComponent
  ]
})
export class CommentModule { }

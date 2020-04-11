import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentRepliesComponent } from './comment-replies/comment-replies.component';
import { CommentComponent } from './components/comment/comment.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsService } from './services/comments.service';
import { TextModule } from '../text/text.module';
import { CommentThreadComponent } from './components/comment-thread/comment-thread.component';
import { CommentsOrderDropdownComponent } from './components/comments-order-dropdown/comments-order-dropdown.component';
import { ChannelMiniModule } from '../channel-mini/channel-mini.module';

@NgModule({
  declarations: [
    CommentComponent,
    CommentRepliesComponent,
    CommentThreadComponent,
    CommentsOrderDropdownComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextModule,
    ChannelMiniModule
  ],
  providers: [
    CommentsService
  ],
  exports: [
    CommentComponent,
    CommentThreadComponent,
    CommentsOrderDropdownComponent
  ]
})
export class CommentModule { }

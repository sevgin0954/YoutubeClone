import { Component, HostListener, Input } from '@angular/core';
import { WindowService } from '../services-singleton/window.service';
import { CommentThreadsService } from '../services-singleton/comment-threads.service';
import { CommentThread } from '../models/comment/comment-thread';
import { Comment } from '../models/comment/comment';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent {

  @Input() parentId: string;
  nextPageToken: string;
  commentThreads: CommentThread[];

  constructor(
    private windowService: WindowService,
    private commentThreadsService: CommentThreadsService
  ) {
    this.commentThreads = [];
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    // TODO: Find why it doeesnt work withhout () =>
    this.windowService.onReachBottom(() => this.loadComments());
  }

  loadComments(): void {
    this.commentThreadsService.getByVideoId(this.parentId, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.commentThreads.push(...data.items);
      });
  }
}

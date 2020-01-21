import { Component, HostListener, Input } from '@angular/core';
import { WindowService } from '../services-singleton/window.service';
import { CommentThreadsService } from '../services-singleton/comment-threads.service';
import { CommentThread } from '../models/comment/comment-thread';
import { FormatterService } from '../services-singleton/formatter.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent {

  @Input() parentId: string;
  nextPageToken: string;
  commentThreads: CommentThread[];
  maxDisplayedCharacters: number = 100;
  isFirstPage: boolean = true;
  areCommentsShown: boolean = false;

  constructor(
    public formatterService: FormatterService,
    private windowService: WindowService,
    private commentThreadsService: CommentThreadsService,
    public domSanitizer: DomSanitizer
  ) {
    this.commentThreads = [];
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    this.windowService.onReachBottom(() => {
      if (this.nextPageToken || this.isFirstPage) {
        this.loadComments();
        this.isFirstPage = false;
      }
    });
  }

  loadComments(): void {
    this.commentThreadsService.getByVideoId(this.parentId, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.commentThreads.push(...data.items);
      });
  }

  getAuthorChannelId(thread: CommentThread): string {
    const authorChannelIdObject = thread.snippet.topLevelComment.snippet.authorChannelId;
    if (authorChannelIdObject) {
      return authorChannelIdObject.value;
    }

    return null;
  }
}

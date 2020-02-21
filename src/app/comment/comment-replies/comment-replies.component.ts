import { Component, Input } from '@angular/core';

import { CommentsService } from 'src/app/services-singleton/comments.service';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent {

  @Input() totalRepliesCount: number;
  @Input() private parentId: string;
  comments: Comment[] = [];
  shouldShowLoading: boolean = false;
  shouldShowReplies: boolean = false;
  shouldShowMoreReplies: boolean = false;
  private isFirstPage: boolean = true;
  private nextPageToken: string;

  constructor(
    private commentsService: CommentsService
  ) { }

  onShowMoreReplies(): void {
    this.shouldShowLoading = true;
    this.shouldShowMoreReplies = false;
    this.shouldShowReplies = true;

    if (this.nextPageToken || this.isFirstPage) {
      this.isFirstPage = false;

      this.commentsService.getByParentId(this.parentId, this.nextPageToken).subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.comments.push(...data.items);

        this.shouldShowLoading = false;

        if (this.comments.length < this.totalRepliesCount) {
          this.shouldShowMoreReplies = true;
        }
        else {
          this.shouldShowMoreReplies = false;
        }
      });
    }
  }

  onShowReplies(): void {
    this.shouldShowReplies = true;
    if (this.isFirstPage) {
      this.onShowMoreReplies();
    }
  }

  onHideReplies(): void {
    this.shouldShowReplies = false;

    const parentElement: Element = document.getElementById(this.parentId);
    parentElement.scrollIntoView({behavior: "smooth", block: "center"});
  }
}

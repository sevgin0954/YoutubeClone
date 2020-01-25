import { Component, Input } from '@angular/core';
import { CommentsService } from 'src/app/services-singleton/comments.service';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent {

  @Input() parentId: string;
  @Input() totalRepliesCount: number;
  comments: Comment[] = [];
  nextPageToken: string;
  isFirstPage: boolean = true;
  shouldShowReplies: boolean = false;
  shouldShowMoreReplies: boolean = false;

  constructor(
    private commentsService: CommentsService
  ) { }

  onShowMoreReplies(): void {
    this.shouldShowReplies = true;

    if (this.nextPageToken || this.isFirstPage) {
      this.isFirstPage = false;

      this.commentsService.getByParentId(this.parentId, this.nextPageToken).subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.comments.push(...data.items);

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
  }
}

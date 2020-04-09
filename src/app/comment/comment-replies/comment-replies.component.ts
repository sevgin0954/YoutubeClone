import { Component, Input } from '@angular/core';

import { CommentsService } from 'src/app/comment/services/comments.service';
import { Comment } from 'src/app/models/comment/comment';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { CommentResource } from 'src/app/shared/enums/resource-properties/comment-resource';
import isRequired from 'src/app/decorators/isRequired';
import isType from 'src/app/decorators/isType';
import isInRange from 'src/app/decorators/isInRange';
import { ExceptionConstants } from 'src/app/shared/Constants/exception-constants';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

const MAX_RESULTS = 20;

@Component({
  selector: 'app-comment-replies',
  templateUrl: './comment-replies.component.html',
  styleUrls: ['./comment-replies.component.scss']
})
export class CommentRepliesComponent {

  @isInRange(1)
  @isRequired
  @isType('number')
  @Input() totalRepliesCount: number;

  @isRequired
  @isType('string')
  @Input() private parentId: string;

  comments: Comment[] = [];
  shouldShowLoading: boolean = false;
  shouldShowReplies: boolean = false;
  shouldShowMoreRepliesBtn: boolean = false;
  private isFirstPage: boolean = true;
  private nextPageToken: string;

  constructor(
    private commentsService: CommentsService
  ) { }

  onShowMoreReplies(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      const exceptionMessage = ExceptionConstants.INVALID_OPERATION + ' No more replies';
      throw Error(exceptionMessage);
    }

    this.shouldShowLoading = true;
    this.shouldShowMoreRepliesBtn = false;
    this.shouldShowReplies = true;

    this.isFirstPage = false;

    const pageArgs = new PageArguments(MAX_RESULTS, this.nextPageToken);
    const resources = [
      CommentResource.id,
      CommentResource.snippet
    ];
    this.commentsService.getByParentId(this.parentId, pageArgs, resources).subscribe(data => {
      this.nextPageToken = data.nextPageToken;
      this.comments.push(...data.items);

      this.shouldShowLoading = false;

      if (this.nextPageToken) {
        this.shouldShowMoreRepliesBtn = true;
      }
      else {
        this.shouldShowMoreRepliesBtn = false;
      }
    });
  }

  onHideReplies(): void {
    if (this.shouldShowReplies === false) {
      const exceptionMessage = ExceptionConstants.INVALID_OPERATION + ' Replies are already hidden.';
      throw Error(exceptionMessage);
    }

    this.shouldShowReplies = false;

    const parentElement: Element = document.getElementById(this.parentId);

    DataValidator.validateFoundElement(parentElement, 'parentElement');

    parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  onShowReplies(): void {
    if (this.shouldShowReplies === true) {
      const exceptionMessage = ExceptionConstants.INVALID_OPERATION + ' Replies are already shown.';
      throw Error(exceptionMessage);
    }

    this.shouldShowReplies = true;
    if (this.isFirstPage) {
      this.onShowMoreReplies();
    }
  }
}

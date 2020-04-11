import { Component, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { CommentThread } from 'src/app/models/comment/comment-thread';
import { CommentThreadOrder } from 'src/app/shared/enums/comment-thread-order';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { CommentThreadsService } from 'src/app/video/services/comment-threads.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { finalize } from 'rxjs/operators';
import isRequired from 'src/app/decorators/isRequired';

const MAX_RESULTS = 20;

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnDestroy {

  @isRequired
  @Input()
  commentCount: number;

  @isRequired
  @Input()
  parentId: string;

  areCommentsDisabled: boolean = false;
  commentThreads: CommentThread[] = [];
  isCurrentlyLoadingComments: boolean = false;
  isMoreComments: boolean = true;
  isOrderButtonDisabled: boolean = false;
  order: CommentThreadOrder = CommentThreadOrder.relevance;
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private videoSubscribtion: Subscription;

  constructor(
    public formatterService: FormatterService,
    private commentThreadsService: CommentThreadsService,
    public domSanitizer: DomSanitizer
  ) { }

  resetComments(): void {
    this.nextPageToken = undefined;
    this.isFirstPage = true;
    this.commentThreads = [];
  }

  loadMoreComments = (): void => {
    this.isCurrentlyLoadingComments = true;

    const pageArgs = new PageArguments(MAX_RESULTS, this.nextPageToken);
    this.videoSubscribtion = this.commentThreadsService
      .getByVideoId(this.parentId, this.order, pageArgs)
      .pipe(
        finalize(() => {
          this.isFirstPage = false;
          this.isCurrentlyLoadingComments = false;

          this.updateIsMoreComments();
        })
      )
      .subscribe(
        data => {
          this.nextPageToken = data.nextPageToken;
          this.commentThreads.push(...data.items);

          this.isOrderButtonDisabled = false;
        },
        error => {
          if (error.status === 403) {
            this.areCommentsDisabled = true;
          }
        }
      );
  }

  private updateIsMoreComments(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreComments = false;
    }
  }

  onChangeOrder(newOrder: CommentThreadOrder): void {
    this.isOrderButtonDisabled = true;

    this.order = newOrder;
    this.resetComments();
  }

  ngOnDestroy(): void {
    if (this.videoSubscribtion) {
      this.videoSubscribtion.unsubscribe();
    }
  }
}

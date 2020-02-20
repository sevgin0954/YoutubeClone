import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { CommentThread } from 'src/app/models/comment/comment-thread';
import { CommentThreadOrder } from 'src/app/shared/enums/comment-thread-order';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { WindowService } from 'src/app/services-singleton/window.service';
import { CommentThreadsService } from 'src/app/services-singleton/comment-threads.service';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent implements OnDestroy {

  @Input() commentCount: number;
  @Input() parentId: string;
  commentThreads: CommentThread[];
  commentThreadOrder: typeof CommentThreadOrder = CommentThreadOrder;
  isOrderButtonDisabled: boolean = false;
  isMoreComments: boolean = true;
  order: CommentThreadOrder = CommentThreadOrder.relevance;
  orderKeys: string[];
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private videoSubscribtion: Subscription;

  constructor(
    public formatterService: FormatterService,
    private windowService: WindowService,
    private commentThreadsService: CommentThreadsService,
    public domSanitizer: DomSanitizer
  ) {
    this.commentThreads = [];
    this.orderKeys = Object.keys(this.commentThreadOrder)
      .filter(x => (parseInt(x) >= 0));
  }

  resetComments(): void {
    this.nextPageToken = undefined;
    this.isFirstPage = true;
    this.commentThreads = [];
  }

  @HostListener("window:scroll")
  private onReachBottom(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.isMoreComments = false;
    }

    if (this.isMoreComments) {
      this.windowService.onReachBottom(() => {
        this.loadComments();
        this.isFirstPage = false;
      });
    }
  }

  private loadComments(): void {
    this.videoSubscribtion = this.commentThreadsService
      .getByVideoId(this.parentId, this.order, this.nextPageToken)
      .subscribe(data => {
        this.nextPageToken = data.nextPageToken;
        this.commentThreads.push(...data.items);

        this.isOrderButtonDisabled = false;
      });
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

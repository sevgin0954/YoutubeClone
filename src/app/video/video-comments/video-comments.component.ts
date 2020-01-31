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

  @Input() parentId: string;
  @Input() commentCount: number;
  videoSubscribtion: Subscription;
  nextPageToken: string;
  commentThreads: CommentThread[];
  isFirstPage: boolean = true;
  order: CommentThreadOrder = CommentThreadOrder.relevance;
  orderKeys: string[];
  isOrderButtonDisabled: boolean = false;
  commentThreadOrder: typeof CommentThreadOrder = CommentThreadOrder;

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
    this.windowService.onReachBottom(() => {
      if (this.nextPageToken || this.isFirstPage) {
        this.isFirstPage = false;
        this.loadComments();
      }
    });
  }

  loadComments(): void {
    this.videoSubscribtion = this.commentThreadsService.getByVideoId(this.parentId, this.order, this.nextPageToken)
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

import { Component, HostListener, Input, OnChanges } from '@angular/core';
import { WindowService } from '../services-singleton/window.service';
import { CommentThreadsService } from '../services-singleton/comment-threads.service';
import { CommentThread } from '../models/comment/comment-thread';
import { FormatterService } from '../services-singleton/formatter.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommentThreadOrder } from '../shared/enums/comment-thread-order';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.scss']
})
export class VideoCommentsComponent {

  @Input() parentId: string;
  @Input() commentCount: number;
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
    this.commentThreadsService.getByVideoId(this.parentId, this.order, this.nextPageToken)
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
}

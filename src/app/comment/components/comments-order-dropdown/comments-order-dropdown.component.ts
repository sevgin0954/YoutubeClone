import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, OnInit } from '@angular/core';

import { CommentThreadOrder } from 'src/app/shared/enums/comment-thread-order';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-comments-order-dropdown',
  templateUrl: './comments-order-dropdown.component.html',
  styleUrls: ['./comments-order-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsOrderDropdownComponent implements OnInit {

  @isRequired
  @Input()
  isOrderButtonDisabled: boolean;

  @isRequired
  @Input()
  order: CommentThreadOrder;

  @Output()
  orderChange = new EventEmitter<CommentThreadOrder>();

  commentThreadOrder = CommentThreadOrder;
  orderKeys: number[];

  ngOnInit(): void {
    this.initOrderKeys();
  }

  private initOrderKeys(): void {
    this.orderKeys = Object.keys(this.commentThreadOrder)
      .map(x => parseInt(x))
      .filter(x => x >= 0);
  }

  onChangeOrder(newOrder: CommentThreadOrder): void {
    this.orderChange.emit(newOrder);
  }
}

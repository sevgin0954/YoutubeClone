import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { CommentThread } from 'src/app/models/comment/comment-thread';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentThreadComponent {

  @isRequired
  @Input()
  thread: CommentThread;
}

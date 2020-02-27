import { Component, Input } from '@angular/core';

import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Comment } from 'src/app/models/comment/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  constructor(
    public formatterService: FormatterService
  ) { }

  @Input() comment: Comment;
  maxDisplayedRows: number = 3;

  getAuthorChannelId(): string {
    const authorChannelIdObject = this.comment.snippet.authorChannelId;
    if (authorChannelIdObject) {
      return authorChannelIdObject.value;
    }

    return null;
  }
}

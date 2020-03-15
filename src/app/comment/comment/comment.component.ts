import { Component, Input } from '@angular/core';

import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Comment } from 'src/app/models/comment/comment';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @isRequired
  @isType('Comment')
  @Input() comment: Comment;
  maxDisplayedRows: number = 3;

  constructor(
    public formatterService: FormatterService
  ) { }

  getAuthorChannelId(): string {
    const authorChannelIdObject = this.comment.snippet.authorChannelId;
    if (authorChannelIdObject) {
      return authorChannelIdObject.value;
    }

    return null;
  }
}

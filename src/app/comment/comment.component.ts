import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() comment: Comment;
  maxDisplayedCharacters: number = 100;

  getAuthorChannelId(): string {
    const authorChannelIdObject = this.comment.snippet.authorChannelId;
    if (authorChannelIdObject) {
      return authorChannelIdObject.value;
    }

    return null;
  }
}

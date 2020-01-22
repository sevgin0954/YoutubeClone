import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment/comment';
import { FormatterService } from '../services-singleton/formatter.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  maxDisplayedCharacters: number = 100;

  constructor (
    private formatterService: FormatterService
  ) { }

  ngOnInit() {

  }

  getAuthorChannelId(): string {
    const authorChannelIdObject = this.comment.snippet.authorChannelId;
    if (authorChannelIdObject) {
      return authorChannelIdObject.value;
    }

    return null;
  }
}

import { CommentThreadSnippet } from './comment-thread-snippet';
import { Comment } from './comment';

export interface CommentThread {
  id: string,
  snippet: CommentThreadSnippet,
  replies: {
    comments: Comment[]
  }
}

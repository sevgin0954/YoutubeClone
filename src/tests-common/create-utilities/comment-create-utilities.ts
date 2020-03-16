import { CommentSnippet } from 'src/app/models/comment/comment-snippet';

export class CommentCreateUtilities {
  public static createSnippet(authorChannelId?: {value: string}) {
    const commentSnippet: CommentSnippet = {
      authorDisplayName: undefined,
      authorProfileImageUrl: undefined,
      authorChannelUrl: undefined,
      authorChannelId: authorChannelId,
      channelId: undefined,
      videoId: undefined,
      textDisplay: undefined,
      textOriginal: undefined,
      parentId: undefined,
      canRate: undefined,
      viewerRating: undefined,
      likeCount: undefined,
      moderationStatus: undefined,
      publishedAt: undefined,
      updatedAt: undefined
    };

    return commentSnippet;
  }
}

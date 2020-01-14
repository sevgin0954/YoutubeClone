export interface CommentThreadSnippet {
  channelId: string,
  videoId: string,
  topLevelComment: Comment,
  canReply: boolean,
  totalReplyCount: number,
  isPublic: boolean
}

export interface CommentSnippet {
  authorDisplayName: string,
  authorProfileImageUrl: string,
  authorChannelUrl: string,
  authorChannelId: {
    value: string
  },
  channelId: string,
  videoId: string,
  textDisplay: string,
  textOriginal: string,
  parentId: string,
  canRate: boolean,
  viewerRating: string,
  likeCount: number,
  moderationStatus: string,
  publishedAt: Date,
  updatedAt: Date
}

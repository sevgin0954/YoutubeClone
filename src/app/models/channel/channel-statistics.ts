export interface ChannelStatistics {
  viewCount: number,
  commentCount: number,
  subscriberCount: number,  // this value is rounded to three significant figures
  hiddenSubscriberCount: boolean,
  videoCount: number
}

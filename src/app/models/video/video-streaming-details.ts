export interface VideoStreamingDetails {
  actualStartTime: Date,
  actualEndTime: Date,
  scheduledStartTime: Date,
  scheduledEndTime: Date,
  concurrentViewers: number,
  activeLiveChatId: string
}

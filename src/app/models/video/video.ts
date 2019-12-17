import {
  VideoSnippet, VideoContantDetails, VideoPlayer, VideoStreamingDetails,
  VideoLocalization, VideoStatus, VideoStatistics } from '.'

export interface Video {
  id: string,
  snippet: VideoSnippet,
  contentDetails: VideoContantDetails,
  status: VideoStatus,
  statistics: VideoStatistics,
  player: VideoPlayer,
  liveStreamingDetails: VideoStreamingDetails,
  localizations: VideoLocalization
}

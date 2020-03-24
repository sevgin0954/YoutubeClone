import {
  VideoSnippet, VideoContantDetails, VideoPlayer, VideoStreamingDetails,
  VideoLocalization, VideoStatus, VideoStatistics } from '.'
import { VideoFileDetails } from './video-file-details';

export interface Video {
  contentDetails: VideoContantDetails,
  fileDetails: VideoFileDetails,
  id: string
  liveStreamingDetails: VideoStreamingDetails,
  localizations: VideoLocalization,
  snippet: VideoSnippet,
  player: VideoPlayer,
  statistics: VideoStatistics,
  status: VideoStatus,
}

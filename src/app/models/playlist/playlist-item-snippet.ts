import { VideoThumbnails } from '../thumbnail/video-thumbnails';

export interface PlaylistItemSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: VideoThumbnails
}

import { VideoThumbnails } from '../thumbnail/video-thumbnails';

export interface PlaylistSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: VideoThumbnails,
  channelTitle: string,
  tags: [
    string
  ],
  defaultLanguage: string
}

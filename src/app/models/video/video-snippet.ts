import { VideoThumbnail } from './video-thumbnail';

export interface VideoSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: {
    default: VideoThumbnail,
    high: VideoThumbnail,
    medium: VideoThumbnail,
    standard: VideoThumbnail
  },
  channelTitle: string,
  tags: string[],
  categoryId :string,
  localized :{
    title :string,
    description :string
  }
}

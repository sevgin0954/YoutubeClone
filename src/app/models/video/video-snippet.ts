import { VideoThumbnails } from '../thumbnail/video-thumbnails';


export interface VideoSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: VideoThumbnails,
  channelTitle: string,
  tags: string[],
  categoryId :string,
  localized :{
    title :string,
    description :string
  }
}

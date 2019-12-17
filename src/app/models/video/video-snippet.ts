import { Thumbnail } from '../thumbnail';


export interface VideoSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: {
    default: Thumbnail,
    high: Thumbnail,
    medium: Thumbnail,
    standard: Thumbnail
  },
  channelTitle: string,
  tags: string[],
  categoryId :string,
  localized :{
    title :string,
    description :string
  }
}

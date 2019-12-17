import { Thumbnail } from '../thumbnail';

export interface ChannelSnippet {
  channelTitle: string,
  title: string,
  description: string,
  resourceId: object,
  channelId: string,
  thumbnails: {
    default: Thumbnail,
    high: Thumbnail,
    medium: Thumbnail
  }
}

import { ChannelResource } from './channel-resource';
import { Thumbnail } from '../thumbnail/thumbnail';

export interface ChannelSnippet {
  title: string,
  description: string,
  resourceId: ChannelResource,
  thumbnails: {
    default: Thumbnail,
    high: Thumbnail,
    medium: Thumbnail
  }
}

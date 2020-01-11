import { Thumbnail } from '../thumbnail';
import { ChannelResource } from './channel-resource';

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

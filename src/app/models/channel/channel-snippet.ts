import { ChannelResource } from './channel-resource';
import { ChannelThumbnails } from './channel-thumbnails';

export interface ChannelSnippet {
  title: string,
  description: string,
  resourceId: ChannelResource,
  thumbnails: ChannelThumbnails
}

import { SearchThumbnails } from './search-thumbnails';

export interface SearchSnippet {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: SearchThumbnails,
  channelTitle: string,
  liveBroadcastContent: string
}

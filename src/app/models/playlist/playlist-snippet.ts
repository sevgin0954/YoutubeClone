import { Thumbnail } from '../thumbnail/thumbnail';

export interface PlaylistSnippet {
  publishedAt: Date,
  channelId: string,
  title: string,
  description: string,
  thumbnails: Thumbnail[],
  channelTitle: string,
  tags: [
    string
  ],
  defaultLanguage: string
}

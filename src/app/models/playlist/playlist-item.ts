import { PlaylistItemSnippet } from './playlist-item-snippet';
import { PlaylistContentDetails } from './playlist-content-details';

export interface PlaylistItem {
  id: string,
  snippet: PlaylistItemSnippet,
  channelTitle: string,
  contentDetails: PlaylistContentDetails
}

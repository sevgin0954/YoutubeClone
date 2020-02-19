import { PlaylistSnippet } from './playlist-snippet';

export interface Playlist {
  id: string,
  snippet: PlaylistSnippet,
  contentDetails: {
    itemCount: number
  },
  player: {
    embedHtml: string
  }
}

import { PlaylistSnippet } from './playlist-snippet';

export interface Playlist {
  id: string,
  kind: "youtube#playlist",
  snippet: PlaylistSnippet,
  contentDetails: {
    itemCount: number
  },
  player: {
    embedHtml: string
  }
}

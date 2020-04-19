import { Video } from 'src/app/models/video/video';
import { VideoSnippet } from 'src/app/models/video';

export class VideoCreateUtilities {
  public static create(id?: string, snippet?: VideoSnippet): Video {
    const video: Video = {
      id: id,
      kind: "youtube#video",
      snippet: snippet,
      contentDetails: undefined,
      status: undefined,
      statistics: undefined,
      player: undefined,
      liveStreamingDetails: undefined,
      localizations: undefined,
      fileDetails: undefined
    };

    return video;
  }

  public static createSnippet(): VideoSnippet {
    const videoSnippet: VideoSnippet = {
      publishedAt: undefined,
      channelId: undefined,
      title: undefined,
      description: undefined,
      thumbnails: undefined,
      channelTitle: undefined,
      tags: undefined,
      categoryId: undefined,
      localized: undefined
    };

    return videoSnippet;
  }
}

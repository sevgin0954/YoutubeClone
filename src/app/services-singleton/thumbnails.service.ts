import { Injectable } from '@angular/core';

import { VideoThumbnails } from '../models/thumbnail/video-thumbnails';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailsService {

  getThumbnailUrl(minSize: VideoThumbnailSize, thumbnails: VideoThumbnails): string {
    let currentThumbnail = thumbnails[VideoThumbnailSize[minSize]];

    const largestSize = this.getLargestThumnail();
    while (currentThumbnail === undefined && minSize <= largestSize) {
      minSize++;
      currentThumbnail = thumbnails[VideoThumbnailSize[minSize]];
    }

    return currentThumbnail.url;
  }

  private getLargestThumnail(): VideoThumbnailSize {
    const thumnailSizeValues = Object.keys(VideoThumbnailSize)
      .filter(key => +key !== NaN)
      .map(key => +key);
    const sortedThumbnailSizeValues = thumnailSizeValues.sort((a, b) => b - a);

    const largestThumbnailValue = sortedThumbnailSizeValues[0];
    const largestThumnail = VideoThumbnailSize[largestThumbnailValue];

    return VideoThumbnailSize[largestThumnail];
  }
}

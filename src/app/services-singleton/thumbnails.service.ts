import { Injectable } from '@angular/core';

import { VideoThumbnails } from '../models/thumbnail/video-thumbnails';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';
import { DataValidator } from '../shared/Validation/data-validator';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailsService {

  getThumbnailUrl(minSize: VideoThumbnailSize, thumbnails: VideoThumbnails): string {
    DataValidator.nullOrUndefinied(minSize, 'minSize');
    this.validateThumbnailsArgument(thumbnails);

    let currentThumbnail = thumbnails[VideoThumbnailSize[minSize]];

    const largestSize = this.getLargestThumnail();
    while (currentThumbnail === undefined && minSize <= largestSize) {
      minSize++;
      currentThumbnail = thumbnails[VideoThumbnailSize[minSize]];
    }

    this.validateIfThumnailIsFound(currentThumbnail);

    return currentThumbnail.url;
  }

  private validateThumbnailsArgument(thumbnails: VideoThumbnails): void {
    DataValidator.nullOrUndefinied(thumbnails, 'thumbnails');
    DataValidator.anyNullOrUndefined(thumbnails, 'thumbnails');
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

  private validateIfThumnailIsFound(thumbnail: string): void {
    if (thumbnail === undefined || thumbnail === null) {
      const exceptionMessage = ExceptionConstants.NOT_FOUND + ` Argument name: thumbnails`;
      throw Error(exceptionMessage);
    }
  }
}

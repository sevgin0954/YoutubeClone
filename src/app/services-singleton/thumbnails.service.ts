import { Injectable } from '@angular/core';

import { ThumbnailSize } from '../shared/enums/thumbnail-size';
import { DataValidator } from '../shared/validation/data-validator';
import { ExceptionConstants } from '../shared/constants/exception-constants';
import { Thumbnail } from '../models/thumbnail/thumbnail';

@Injectable({
  providedIn: 'root'
})
export class ThumbnailsService {

  getThumbnailUrl(minSize: ThumbnailSize, thumbnails: any): string {
    DataValidator.nullOrUndefinied(minSize, 'minSize');
    this.validateNotEmptyThumbnails(thumbnails);

    let currentThumbnail = thumbnails[ThumbnailSize[minSize]];

    const largestSize = this.getLargestThumnail();
    while (currentThumbnail === undefined && minSize <= largestSize) {
      minSize++;
      currentThumbnail = thumbnails[ThumbnailSize[minSize]];
    }

    this.validateIfThumnailIsFound(currentThumbnail);

    // TODO: Refactor to return the thumbnail
    return currentThumbnail.url;
  }

  private validateNotEmptyThumbnails(thumbnails: any): void {
    DataValidator.nullOrUndefinied(thumbnails, 'thumbnails');

    const thumbnailPropertyValues = Object.values(thumbnails);
    const firstDefinedValue = thumbnailPropertyValues
      .find(v => v != null);
    if (firstDefinedValue == null) {
      const exceptionMessage = ExceptionConstants.INVALID_ARGUMENT + ' thumbnails property';
      throw Error(exceptionMessage);
    }
  }

  private getLargestThumnail(): ThumbnailSize {
    const thumnailSizeValues = Object.keys(ThumbnailSize)
      .filter(key => +key !== NaN)
      .map(key => +key);
    const sortedThumbnailSizeValues = thumnailSizeValues.sort((a, b) => b - a);

    const largestThumbnailValue = sortedThumbnailSizeValues[0];
    const largestThumnail = ThumbnailSize[largestThumbnailValue];

    return ThumbnailSize[largestThumnail];
  }

  private validateIfThumnailIsFound(thumbnail: Thumbnail): void {
    if (thumbnail == null) {
      const exceptionMessage = ExceptionConstants.NOT_FOUND + ` Argument name: thumbnails`;
      throw Error(exceptionMessage);
    }
  }
}

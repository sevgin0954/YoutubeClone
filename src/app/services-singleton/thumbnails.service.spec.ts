import { TestBed } from '@angular/core/testing';

import { ThumbnailsService } from './thumbnails.service';
import { VideoThumbnailSize } from '../shared/enums/video-thumbnail-size';
import { VideoThumbnails } from '../models/thumbnail/video-thumbnails';
import { Thumbnail } from '../models/thumbnail/thumbnail';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

let service: any;

beforeEach(() => {
  service = new ThumbnailsService();
});

describe('ThumbnailsService', () => {

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ThumbnailsService\s getThumbnailUrl method', () => {

  it('with null minSize should throw an exception', () => {
    // Arrange
    const minSize = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithMinSize(minSize)).toThrowError(exceptionRegex);
  });

  it('with null thumbnails should throw an exception', () => {
    // Arrange
    const thumbnails = null;
    const exceptionRegex = new RegExp(ExceptionConstants.NULL_OR_UNDEFINED);

    // Act

    // Assert
    expect(() => callMethodWithThumbnails(thumbnails)).toThrowError(exceptionRegex);
  });

  it('with thumbnails with all thumnails undefined inside should throw an exception', () => {
    // Arrange
    const thumbnails = {
      default: undefined,
      high: undefined,
      medium: undefined,
      standard: undefined,
      maxres: undefined
    };
    const exceptionRegex = new RegExp(ExceptionConstants.INVALID_ARGUMENT);

    // Act

    // Assert
    expect(() => callMethodWithThumbnails(thumbnails)).toThrowError(exceptionRegex);
  });

  it('with minSize and thumnails with thumbnail with the same size should return the thumbnail', () => {
    // Arrange
    const minSize = VideoThumbnailSize.medium;
    const mediumThumbnail: Thumbnail = createThumbnail();
    const thumbnails: VideoThumbnails = {
      default: undefined,
      high: undefined,
      medium: mediumThumbnail,
      standard: undefined,
      maxres: undefined
    };

    // Act
    const urlResult = service.getThumbnailUrl(minSize, thumbnails);

    // Assert
    expect(urlResult).toEqual(mediumThumbnail.url);
  });

  it('with minSize and thumbnails without the same size should return the closest size thumbnail larger than minSize', () => {
    // Arrange
    const minSize = VideoThumbnailSize.default;
    const mediumThumbnail: Thumbnail = createThumbnail();
    const thumbnails: VideoThumbnails = {
      default: undefined,
      high: undefined,
      medium: mediumThumbnail,
      standard: undefined,
      maxres: undefined
    };

    // Act
    const urlResult = service.getThumbnailUrl(minSize, thumbnails);

    // Assert
    expect(urlResult).toEqual(mediumThumbnail.url);
  });

  it('with minSize and thumbnails without the same size thumbnail or with larger should throw an exception', () => {
    // Arrange
    const minSize = VideoThumbnailSize.standard;
    const mediumThumbnail: Thumbnail = createThumbnail();
    const thumbnails: VideoThumbnails = {
      default: undefined,
      high: undefined,
      medium: mediumThumbnail,
      standard: undefined,
      maxres: undefined
    };
    const exceptionRegex = new RegExp(ExceptionConstants.NOT_FOUND);

    // Act

    // Assert
    expect(() => service.getThumbnailUrl(minSize, thumbnails)).toThrowError(exceptionRegex);
  });

  function callMethodWithMinSize(minSize: VideoThumbnailSize): string {
    const thumnail: Thumbnail = {
      height: 1,
      url: '123.com',
      width: 1
    };
    const thumbnails: VideoThumbnails = {
      default: thumnail,
      high: null,
      medium: null,
      standard: null,
      maxres: null
    };
    const urlResut = service.getThumbnailUrl(minSize, thumbnails);

    return urlResut;
  }

  function callMethodWithThumbnails(thumbnails: VideoThumbnails): string {
    const minSize = VideoThumbnailSize.default;
    const urlResult = service.getThumbnailUrl(minSize, thumbnails);

    return urlResult;
  }
});

function createThumbnail(): Thumbnail {
  const mediumThumbnail: Thumbnail = {
    height: 5,
    url: '123.com',
    width: 5
  };

  return mediumThumbnail;
}

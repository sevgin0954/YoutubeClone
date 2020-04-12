import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoThumbnailComponent {

  @isRequired
  @Input()
  video: Video;

  @isRequired
  @Input()
  private size: ThumbnailSize;

  constructor(
    private thumbnailsService: ThumbnailsService
  ) { }

  get sizeString(): string {
    return ThumbnailSize[this.size];
  }

  getThumbnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailsService.getThumbnailUrl(this.size, thumbnails);

    return url;
  }
}

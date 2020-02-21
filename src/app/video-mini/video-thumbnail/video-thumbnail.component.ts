import { Component, Input } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss']
})
export class VideoThumbnailComponent {

  @Input() video: Video;
  @Input() private size: VideoThumbnailSize;

  constructor(
    private thumbnailsService: ThumbnailsService
  ) { }

  getThumbnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailsService.getThumbnailUrl(this.size, thumbnails);

    return url;
  }

  get sizeString(): string {
    return VideoThumbnailSize[this.size];
  }
}

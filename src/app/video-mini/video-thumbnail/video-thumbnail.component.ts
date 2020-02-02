import { Component, Input } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss']
})
export class VideoThumbnailComponent {

  @Input() video: Video;
  @Input() private size: VideoThumbnailSize;

  get sizeString(): string {
    return VideoThumbnailSize[this.size];
  }
}

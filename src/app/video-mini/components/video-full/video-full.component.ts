import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import isRequired from 'src/app/decorators/isRequired';
import isInRange from 'src/app/decorators/isInRange';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';

@Component({
  selector: 'app-video-full',
  templateUrl: './video-full.component.html',
  styleUrls: ['./video-full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoFullComponent {

  @isRequired
  @Input()
  video: Video;

  @isInRange(1)
  @isRequired
  @Input()
  descriptionMaxDisplayedRows: number;

  @isInRange(1)
  @isRequired
  @Input()
  titleMaxDisplayedRows: number;

  @Input()
  thumbnailSize = ThumbnailSize.default;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import isRequired from 'src/app/decorators/isRequired';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';

@Component({
  selector: 'app-single-playlist-playlist',
  templateUrl: './single-playlist-playlist.component.html',
  styleUrls: ['./single-playlist-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SinglePlaylistTemplateComponent {

  @isRequired
  @Input()
  video: Video;

  titleMaxDisplayedRows: number = 2;
  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;
}

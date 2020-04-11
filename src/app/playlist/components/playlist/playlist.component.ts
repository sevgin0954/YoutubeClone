import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Playlist } from 'src/app/models/playlist/playlist';
import isRequired from 'src/app/decorators/isRequired';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistComponent {

  @isRequired
  @Input()
  playlist: Playlist;

  constructor(
    private thumbnailService: ThumbnailsService
  ) { }

  getThumnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailService.getThumbnailUrl(VideoThumbnailSize.default, thumbnails);

    return url;
  }
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Playlist } from 'src/app/models/playlist/playlist';
import isRequired from 'src/app/decorators/isRequired';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';

@Component({
  selector: 'app-playlist-thumbnail',
  templateUrl: './playlist-thumbnail.component.html',
  styleUrls: ['./playlist-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistThumbnailComponent {

  @isRequired
  @Input()
  playlist: Playlist;

  @Input()
  thumbnailSize: ThumbnailSize = ThumbnailSize.default;

  constructor(
    private thumbnailService: ThumbnailsService
  ) { }

  getThumnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailService.getThumbnailUrl(this.thumbnailSize, thumbnails);

    return url;
  }
}

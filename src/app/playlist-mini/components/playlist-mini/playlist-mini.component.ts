import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Playlist } from 'src/app/models/playlist/playlist';
import isRequired from 'src/app/decorators/isRequired';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';

@Component({
  selector: 'app-playlist-mini',
  templateUrl: './playlist-mini.component.html',
  styleUrls: ['./playlist-mini.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistMiniComponent {

  @isRequired
  @Input()
  playlist: Playlist;

  @Input()
  thumbnailSize: ThumbnailSize = ThumbnailSize.default;
}

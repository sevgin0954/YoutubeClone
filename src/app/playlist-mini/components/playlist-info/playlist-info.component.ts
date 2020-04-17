import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import isRequired from 'src/app/decorators/isRequired';
import { Playlist } from 'src/app/models/playlist/playlist';

@Component({
  selector: 'app-playlist-info',
  templateUrl: './playlist-info.component.html',
  styleUrls: ['./playlist-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistInfoComponent {

  @isRequired
  @Input()
  playlist: Playlist;
}

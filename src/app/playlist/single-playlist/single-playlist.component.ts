import { Component, Input, OnChanges } from '@angular/core';

import { SnippetStyle } from 'src/app/shared/enums/snippet-style';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss']
})
export class SinglePlaylistComponent implements OnChanges {

  @Input() playlistId: string;
  @Input() style: SnippetStyle;

  constructor(
    private playlistService: PlaylistService
  ) {}

  ngOnChanges(): void {

  }
}

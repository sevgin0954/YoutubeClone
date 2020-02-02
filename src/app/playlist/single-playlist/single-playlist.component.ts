import { Component, Input, OnChanges } from '@angular/core';

import { SnippetStyle } from 'src/app/shared/enums/snippet-style';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { concatMap } from 'rxjs/operators';
import { Video } from 'src/app/models/video/video';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-playlist',
  templateUrl: './single-playlist.component.html',
  styleUrls: ['./single-playlist.component.scss']
})
export class SinglePlaylistComponent implements OnChanges {

  @Input() playlistId: string;
  @Input() style: SnippetStyle;
  videos$: Observable<Video[]>;

  constructor(
    private playlistService: PlaylistService,
    private videoService: VideoService
  ) { }

  ngOnChanges(): void {
    this.videos$ = this.playlistService.getById(this.playlistId).pipe(
      concatMap(playlistItems => {
        const videoIds = playlistItems.map(item => item.contentDetails.videoId)

        return this.videoService.getByIds(...videoIds);
      })
    );
  }
}

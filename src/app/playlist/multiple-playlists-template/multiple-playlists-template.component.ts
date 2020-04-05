import { Component, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { Playlist } from 'src/app/models/playlist/playlist';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';
import { VideoThumbnails } from 'src/app/models/thumbnail/video-thumbnails';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';

@Component({
  selector: 'app-multiple-playlists-template',
  templateUrl: './multiple-playlists-template.component.html',
  styleUrls: ['./multiple-playlists-template.component.scss']
})
export class MultiplePlaylistsTemplateComponent implements AfterViewInit {

  @isRequired
  @isType('object')
  @Input()
  playlist: Playlist;

  constructor(
    private thumbnailService: ThumbnailsService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  getThumnailUrl(thumbnails: VideoThumbnails): string {
    const url = this.thumbnailService.getThumbnailUrl(VideoThumbnailSize.default, thumbnails);

    return url;
  }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detach();
  }
}

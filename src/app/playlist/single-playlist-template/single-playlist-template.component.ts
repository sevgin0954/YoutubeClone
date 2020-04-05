import { Component, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';
import { VideoThumbnailSize } from 'src/app/shared/enums/video-thumbnail-size';

@Component({
  selector: 'app-single-playlist-template',
  templateUrl: './single-playlist-template.component.html',
  styleUrls: ['./single-playlist-template.component.scss']
})
export class SinglePlaylistTemplateComponent implements AfterViewInit {

  @isRequired
  @isType('object')
  @Input()
  video: Video;

  videoSize: VideoThumbnailSize = VideoThumbnailSize.medium;

  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.changeDetectionRef.detach();
  }
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import isRequired from 'src/app/decorators/isRequired';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';
import { ThumbnailsService } from 'src/app/services-singleton/thumbnails.service';

@Component({
  selector: 'app-channel-mini',
  templateUrl: './channel-mini.component.html',
  styleUrls: ['./channel-mini.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelMiniComponent {

  @isRequired
  @Input()
  channel: Channel;

  @Input()
  thumbnailSize: ThumbnailSize = ThumbnailSize.default;

  constructor(
    private thumbnailsService: ThumbnailsService
  ) { }

  getThumbnailUrl(): string {
    const url = this.thumbnailsService
      .getThumbnailUrl(this.thumbnailSize, this.channel.snippet.thumbnails);

    return url;
  }
}

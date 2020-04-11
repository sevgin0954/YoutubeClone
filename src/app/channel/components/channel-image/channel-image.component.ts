import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ChannelImages } from 'src/app/models/channel/channel-images';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-channel-image',
  templateUrl: './channel-image.component.html',
  styleUrls: ['./channel-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelImageComponent {

  @isRequired
  @Input()
  images: ChannelImages;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import isRequired from 'src/app/decorators/isRequired';

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
}

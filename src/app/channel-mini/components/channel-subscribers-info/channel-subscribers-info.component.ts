import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { ChannelStatistics } from 'src/app/models/channel/channel-statistics';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-channel-subscribers-info',
  templateUrl: './channel-subscribers-info.component.html',
  styleUrls: ['./channel-subscribers-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelSubscribersInfoComponent {

  @isRequired
  @Input()
  channelStatistics: ChannelStatistics;

  constructor(
    public formatterService: FormatterService
  ) { }
}

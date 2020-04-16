import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoDescriptionComponent {

  @isRequired
  @Input()
  channel: Channel;

  @isRequired
  @Input()
  text: string;

  maxDisplayedRows: number = 3;
}

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-channel-banner',
  templateUrl: './channel-banner.component.html',
  styleUrls: ['./channel-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelBannerComponent {

  @isRequired
  @Input()
  id: string;

  @isRequired
  @Input()
  url: string;

}

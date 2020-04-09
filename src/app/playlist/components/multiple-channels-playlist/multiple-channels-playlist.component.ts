import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import isRequired from 'src/app/decorators/isRequired';
import isType from 'src/app/decorators/isType';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChannelsPlaylistTemplateComponent {

  @isRequired
  @isType('object')
  @Input()
  channel: Channel;

  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  onChannelLoaded(): void {
    this.changeDetectionRef.detectChanges();
  }

  onUpdate(): void {
    this.changeDetectionRef.detectChanges();
  }
}

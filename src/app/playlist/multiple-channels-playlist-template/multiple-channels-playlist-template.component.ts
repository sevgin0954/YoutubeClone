import { Component, Input, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Channel } from 'src/app/models/channel/channel';
import isRequired from 'src/decorators/isRequired';
import isType from 'src/decorators/isType';

@Component({
  selector: 'app-multiple-channels-playlist-template',
  templateUrl: './multiple-channels-playlist-template.component.html',
  styleUrls: ['./multiple-channels-playlist-template.component.scss']
})
export class MultipleChannelsPlaylistTemplateComponent implements AfterViewChecked {

  @isRequired
  @isType('object')
  @Input()
  channel: Channel;

  private hasContentLoaded = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    if (this.hasContentLoaded) {
      this.changeDetectionRef.detach();
    }
  }

  onChannelLoaded(): void {
    this.hasContentLoaded = true;
  }

  onUpdate(): void {
    this.changeDetectionRef.detectChanges();
  }
}

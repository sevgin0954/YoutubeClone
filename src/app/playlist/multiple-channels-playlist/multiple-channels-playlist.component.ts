import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewChecked } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChannelsPlaylistComponent implements OnInit, AfterViewChecked {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public windowService: WindowService
  ) {}

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  callBack: Function = (callback: Function) => this.loadMoreVideos(callback);
  channelIds: string[];
  totalResultsCount: number;

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  loadMoreVideos(callback: Function): void {
    this.channelIds = this.channelSection.contentDetails.channels;
    this.totalResultsCount = this.channelIds.length;
    this.changeDetectorRef.detectChanges();
  }

  onPlaylistResize(): void {
    this.changeDetectorRef.detectChanges();
  }
}

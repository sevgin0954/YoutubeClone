import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewChecked, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';
import { PlaylistElementService } from '../services/playlist-element.service';
import { BasePlaylistComponent } from '../base-playlist-component';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChannelsPlaylistComponent extends BasePlaylistComponent implements OnInit, AfterViewChecked {

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    playlistElementService: PlaylistElementService,
    public windowService: WindowService
  ) {
    super(playlistElementService, changeDetectorRef);
  }

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
  loadMoreCallBack: Function = (onLoadedMoreCallback: Function) =>
    this.loadMoreVideos(onLoadedMoreCallback);
  channelIds: string[];
  totalResultsCount: number;

  ngOnInit(): void {
    this.loadMoreVideos(() => { });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  // TODO: callback doesnt get called
  loadMoreVideos(onLoadedMoreCallback: Function): void {
    this.channelIds = this.channelSection.contentDetails.channels;
    this.totalResultsCount = this.channelIds.length;
    this.changeDetectorRef.detectChanges();
  }
}

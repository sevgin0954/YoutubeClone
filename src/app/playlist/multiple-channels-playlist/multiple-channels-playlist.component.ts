import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, AfterViewChecked, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { WindowService } from 'src/app/services-singleton/window.service';
import { PlaylistElementService } from '../services/playlist-element.service';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleChannelsPlaylistComponent implements OnInit, AfterViewChecked {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private playlistElementService: PlaylistElementService,
    public windowService: WindowService
  ) {}

  @Input() channelSection: ChannelSection;
  @Input() style: ChannelSectionStyle;
  @ViewChildren('playlistElement') playlistElements: QueryList<ElementRef>;
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
    const playlistNativeElements = this.playlistElements.map(e => e.nativeElement);
    this.playlistElementService.tryShowLeftHiddenElements(playlistNativeElements);

    this.changeDetectorRef.detectChanges();
  }
}

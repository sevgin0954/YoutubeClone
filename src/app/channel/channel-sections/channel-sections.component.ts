import { Component, OnInit, Input } from '@angular/core';

import { ChannelSectionService } from 'src/app/services-singleton/channel-section.service';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { SnippetType } from 'src/app/shared/enums/snippet-type';

@Component({
  selector: 'app-channel-sections',
  templateUrl: './channel-sections.component.html',
  styleUrls: ['./channel-sections.component.scss']
})
export class ChannelSectionsComponent implements OnInit {

  @Input() channelId: string;
  multipleChannelsSection: ChannelSection[];
  singlePlaylistSection: ChannelSection[];

  constructor(
    private channelSectionService: ChannelSectionService
  ) {
    this.multipleChannelsSection = [];
    this.singlePlaylistSection = [];
  }

  ngOnInit() {
    this.channelSectionService.getByChannelId(this.channelId).subscribe(channels => {
      this.initChannels(channels);
    });
  }

  initChannels(channels: ChannelSection[]): void {
    channels.forEach(channel => {
      const channelType = channel.snippet.type;
      if (SnippetType[SnippetType.multipleChannels] === channelType) {
        this.multipleChannelsSection.push(channel);
      }
      else if (SnippetType[SnippetType.singlePlaylist] === channelType) {
        this.singlePlaylistSection.push(channel);
      }
    });
  }
}

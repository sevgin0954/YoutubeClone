import { Component, Input, OnChanges } from '@angular/core';

import { ChannelSectionService } from 'src/app/channel/services/channel-section.service';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { SnippetType } from 'src/app/shared/enums/snippet-type';
import isRequired from 'src/decorators/isRequired';
import isNotEmptyString from 'src/decorators/isNotEmptyString';

@Component({
  selector: 'app-channel-sections',
  templateUrl: './channel-sections.component.html',
  styleUrls: ['./channel-sections.component.scss']
})
export class ChannelSectionsComponent implements OnChanges {

  @isRequired
  @isNotEmptyString
  @Input() channelId: string;

  channelSections: ChannelSection[];
  snippetStyle: typeof ChannelSectionStyle = ChannelSectionStyle;
  snippetType: typeof SnippetType = SnippetType;

  constructor(
    private channelSectionService: ChannelSectionService
  ) { }

  getSectionType(channelSection: ChannelSection): string {
    return channelSection.snippet.type;
  }

  ngOnChanges(): void {
    this.channelSectionService.getByChannelId(this.channelId).subscribe(sections => {
      const sortedChannels = sections.sort((a, b) => a.snippet.position - b.snippet.position);
      this.channelSections = sortedChannels;
    });
  }
}

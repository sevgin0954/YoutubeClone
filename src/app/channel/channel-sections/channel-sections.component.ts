import { Component, Input, OnChanges, OnDestroy } from '@angular/core';

import { ChannelSectionService } from 'src/app/channel/services/channel-section.service';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSectionType } from 'src/app/shared/enums/channel-section-type';
import isRequired from 'src/app/decorators/isRequired';
import { Subscription } from 'rxjs';
import isType from 'src/app/decorators/isType';
import { ChannelSectionResource } from 'src/app/shared/enums/resource-properties/channel-section-resource';

@Component({
  selector: 'app-channel-sections',
  templateUrl: './channel-sections.component.html',
  styleUrls: ['./channel-sections.component.scss']
})
export class ChannelSectionsComponent implements OnChanges, OnDestroy {

  @isRequired
  @isType('string')
  @Input()
  channelId: string;

  channelSections: ChannelSection[];
  sectionStyle: typeof ChannelSectionStyle = ChannelSectionStyle;
  sectionType: typeof ChannelSectionType = ChannelSectionType;
  private subscription: Subscription;

  constructor(
    private channelSectionService: ChannelSectionService
  ) { }

  getSectionType(channelSection: ChannelSection): string {
    return channelSection.snippet.type;
  }

  ngOnChanges(): void {
    const resources = [
      ChannelSectionResource.snippet,
      ChannelSectionResource.contentDetails
    ]
    this.subscription = this.channelSectionService.getByChannelId(this.channelId, resources).subscribe(sections => {
      const sortedChannels = sections.sort((a, b) => a.snippet.position - b.snippet.position);
      this.channelSections = sortedChannels;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

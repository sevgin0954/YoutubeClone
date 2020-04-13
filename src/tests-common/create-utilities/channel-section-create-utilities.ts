import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ChannelSectionSnippet } from 'src/app/models/channel-section/channel-section-snippet';
import { ChannelSectionType } from 'src/app/shared/enums/channel-section-type';
import { ChannelContentDetails } from 'src/app/models/channel-section/channel-content-details';

export class ChannelSectionCreateUtilities {
  public static create(
    snippet?: ChannelSectionSnippet,
    id?: string,
    contentDetails?: ChannelContentDetails
    ): ChannelSection {
    const channelSection: ChannelSection = {
      contentDetails: contentDetails,
      id: id,
      snippet: snippet
    };

    return channelSection;
  }

  public static createSnippet(
    channelId?: string,
    position?: number,
    type?: ChannelSectionType
  ): ChannelSectionSnippet {
    const channelSectionSnippet = {
      position: position,
      channelId: channelId,
      defaultLanguage: 'randomLanguage',
      localized: undefined,
      style: 'randomStyle',
      title: 'randomTitle',
      type: ChannelSectionType[type]
    };

    return channelSectionSnippet;
  }
}

import { ChannelSection } from 'src/app/models/channel-section/channel-section';
import { ChannelSectionSnippet } from 'src/app/models/channel-section/channel-section-snippet';

export class ChannelSectionCreateUtilities {
  public static create(snippet?: ChannelSectionSnippet, id?: string): ChannelSection {
    const channelSection = {
      contentDetails: undefined,
      id: id,
      snippet: snippet
    };

    return channelSection;
  }

  public static createSnippet(channelId?: string, position?: number): ChannelSectionSnippet {
    const channelSectionSnippet = {
      position: position,
      channelId: channelId,
      defaultLanguage: 'randomLanguage',
      localized: undefined,
      style: 'randomStyle',
      title: 'randomTitle',
      type: 'randomType'
    };

    return channelSectionSnippet;
  }
}

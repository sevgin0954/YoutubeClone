import { ChannelSectionSnippet } from './channel-section-snippet';
import { ContentDetails } from './channel-content-details';

export interface ChannelSection {
  id: string,
  snippet: ChannelSectionSnippet,
  contentDetails: ContentDetails
}

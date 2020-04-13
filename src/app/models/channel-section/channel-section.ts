import { ChannelSectionSnippet } from './channel-section-snippet';
import { ChannelContentDetails } from './channel-content-details';

export interface ChannelSection {
  id: string,
  snippet: ChannelSectionSnippet,
  contentDetails: ChannelContentDetails
}

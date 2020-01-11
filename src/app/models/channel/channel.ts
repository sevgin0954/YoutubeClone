import { ChannelSnippet } from './channel-snippet';
import { ChannelStatistics } from './channel-statistics';

export interface Channel {
  id: string,
  snippet: ChannelSnippet,
  statistics: ChannelStatistics
}

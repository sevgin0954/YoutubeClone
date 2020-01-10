import { ChannelSnippet } from './channel-snippet';
import { ChannelStatistics } from './channel-statistics';

export interface Channel {
  snippet: ChannelSnippet,
  statistics: ChannelStatistics
}

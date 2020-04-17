import { ChannelSnippet } from './channel-snippet';
import { ChannelStatistics } from './channel-statistics';
import { ChannelBrandingSettings } from './channel-branding-setting';

export interface Channel {
  brandingSettings: ChannelBrandingSettings,
  id: string,
  kind: "youtube#channel",
  snippet: ChannelSnippet,
  statistics: ChannelStatistics,
}

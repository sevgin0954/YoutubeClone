import { ChannelSnippet } from './channel-snippet';
import { ChannelStatistics } from './channel-statistics';
import { ChannelBrandingSettings } from './channel-branding-setting';

export interface Channel {
  id: string,
  snippet: ChannelSnippet,
  statistics: ChannelStatistics,
  brandingSettings: ChannelBrandingSettings
}

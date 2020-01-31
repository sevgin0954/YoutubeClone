import { ChannelSnippet } from './channel-snippet';
import { ChannelStatistics } from './channel-statistics';
import { BrandingSettings } from './channel-branding-setting';

export interface Channel {
  id: string,
  snippet: ChannelSnippet,
  statistics: ChannelStatistics,
  brandingSettings: BrandingSettings
}

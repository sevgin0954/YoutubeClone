import { ChannelBrandingSettings } from 'src/app/models/channel/channel-branding-setting';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelSnippet } from 'src/app/models/channel/channel-snippet';
import { ChannelStatistics } from 'src/app/models/channel/channel-statistics';

export class ChannelCreateUtilities {
  public static createBrandingSettings(): ChannelBrandingSettings {
    const channelBrandingSettings: ChannelBrandingSettings = {
      channel: undefined,
      image: {
        bannerImageUrl: 'bannerImageUrl',
        bannerMobileImageUrl: 'bannerMobileImageUrl',
        bannerTabletLowImageUrl: 'bannerTabletLowImageUrl',
        bannerTabletImageUrl: 'bannerTabletImageUrl',
        bannerTabletHdImageUrl: 'bannerTabletHdImageUrl',
        bannerTabletExtraHdImageUrl: 'bannerTabletExtraHdImageUrl',
        bannerMobileLowImageUrl: 'bannerMobileLowImageUrl',
        bannerMobileMediumHdImageUrl: 'bannerMobileMediumHdImageUrl',
        bannerMobileHdImageUrl: 'bannerMobileHdImageUrl',
        bannerMobileExtraHdImageUrl: 'bannerMobileExtraHdImageUrl',
        bannerTvImageUrl: 'bannerTvImageUrl',
        bannerTvLowImageUrl: 'bannerTvLowImageUrl',
        bannerTvMediumImageUrl: 'bannerTvMediumImageUrl',
        bannerTvHighImageUrl: 'bannerTvHighImageUrl'
      }
    };

    return channelBrandingSettings;
  }

  public static createChannel(
    channelBrandingSettings?: ChannelBrandingSettings,
    snippet?: ChannelSnippet,
    statistics?: ChannelStatistics
  ): Channel {
    const channel: Channel = {
      brandingSettings: channelBrandingSettings,
      id: '123',
      snippet: snippet,
      statistics: statistics
    };

    return channel;
  }
}

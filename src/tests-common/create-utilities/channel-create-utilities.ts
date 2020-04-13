import { ChannelBrandingSettings } from 'src/app/models/channel/channel-branding-setting';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelSnippet } from 'src/app/models/channel/channel-snippet';
import { ChannelStatistics } from 'src/app/models/channel/channel-statistics';
import { ChannelResource } from 'src/app/models/channel/channel-resource';
import { ChannelThumbnails } from 'src/app/models/channel/channel-thumbnails';
import { ChannelContentDetails } from 'src/app/models/channel-section/channel-content-details';

export class ChannelCreateUtilities {

  public static create(
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

  public static createContentDetails(
    channels: string[],
    playlists: string[]
  ): ChannelContentDetails {
    const contentDetails: ChannelContentDetails = {
      channels: channels,
      playlists: playlists
    };

    return contentDetails;
  }

  public static createSnippet(
    resourceId?: ChannelResource,
    thumbnails?: ChannelThumbnails,
    title?: string
  ): ChannelSnippet {
    const snippet: ChannelSnippet = {
      description: 'abcs',
      resourceId: resourceId,
      thumbnails: thumbnails,
      title: title
    };

    return snippet;
  }
}

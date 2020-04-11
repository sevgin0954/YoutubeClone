import { ChannelImages } from './channel-images';

export interface ChannelBrandingSettings {
  image: ChannelImages,
  channel: {
    title: string,
    description: string,
    defaultTab: string,
    moderateComments: boolean,
    showRelatedChannels: boolean,
    showBrowseView: boolean,
    featuredChannelsTitle: string,
    featuredChannelsUrls: string[],
    unsubscribedTrailer: string
  }
}

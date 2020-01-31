export interface BrandingSettings {
  image: {
    bannerImageUrl: string
    bannerMobileImageUrl: string
    bannerTabletLowImageUrl: string
    bannerTabletImageUrl: string
    bannerTabletHdImageUrl: string
    bannerTabletExtraHdImageUrl: string
    bannerMobileLowImageUrl: string
    bannerMobileMediumHdImageUrl: string
    bannerMobileHdImageUrl: string
    bannerMobileExtraHdImageUrl: string
    bannerTvImageUrl: string
    bannerTvLowImageUrl: string
    bannerTvMediumImageUrl: string
    bannerTvHighImageUrl: string
  },
  channel: {
    title: string,
    description: string,
    defaultTab: string,
    moderateComments: boolean,
    showRelatedChannels: boolean,
    showBrowseView: boolean,
    featuredChannelsTitle: string,
    featuredChannelsUrls: string[],
    unsubscribedTrailer: string,

  }
}

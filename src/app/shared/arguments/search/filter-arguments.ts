import { SearchChannelType } from '../../enums/search/search-channel-type';
import { SearchResultOrder } from '../../enums/search/search-result-order';
import { RegionCode } from '../../enums/region-code';
import { LanguageCode } from '../../enums/language-code';
import { SearchType } from '../../enums/search/search-type';
import { VideoFilterArguments } from './video-filter-arguments';
import { ExceptionConstants } from '../../constants/exception-constants';

export class FilterArguments {
  private _channelType: SearchChannelType;
  private _publishedBefore: Date;
  private _order: SearchResultOrder;
  private _regionCode: RegionCode;
  private _relevanceLanguage: LanguageCode;
  private _type: SearchType;
  private _videoFilterArguments?: VideoFilterArguments;

  // constructor(
  //   channelType: SearchChannelType,
  //   publishedBefore: Date,
  //   order: SearchResultOrder,
  //   regionCode: RegionCode,
  //   relevanceLanguage: LanguageCode,
  //   type: SearchType,
  //   videoFilterArguments?: VideoFilterArguments
  // ) {
  //   this.channelType = channelType;
  //   this.publishedBefore = publishedBefore;
  //   this.order = order;
  //   this.regionCode = regionCode;
  //   this.relevanceLanguage = relevanceLanguage;
  //   this.type = type;
  //   this._videoFilterArguments = videoFilterArguments;
  // }

  get channelType(): SearchChannelType {
    return this._channelType;
  }
  set channelType(value: SearchChannelType) {
    this._channelType = value;
  }

  get publishedBefore(): Date {
    return this._publishedBefore;
  }
  set publishedBefore(value: Date) {
    this._publishedBefore = value;
  }

  get order(): SearchResultOrder {
    return this._order;
  }
  set order(value: SearchResultOrder) {
    this._order = value;
  }

  get regionCode(): RegionCode {
    return this._regionCode;
  }
  set regionCode(value: RegionCode) {
    this._regionCode = value;
  }

  get relevanceLanguage(): LanguageCode {
    return this._relevanceLanguage;
  }
  set relevanceLanguage(value: LanguageCode) {
    this._relevanceLanguage = value;
  }

  get type(): SearchType {
    return this._type;
  }
  set type(value: SearchType) {
    this._type = value;
  }

  get videoFilterArguments(): VideoFilterArguments {
    return this._videoFilterArguments;
  }
  set videoFilterArguments(value: VideoFilterArguments) {
    if (value != null && this.type != SearchType.video) {
      const exceptionMessage = ExceptionConstants.VIDEO_FILTER_ARGUMENTS_NOT_VIDEO_TYPE;
      throw new Error(exceptionMessage);
    }

    this._videoFilterArguments = value;
  }
}

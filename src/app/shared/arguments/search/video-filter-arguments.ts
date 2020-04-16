import { SearchVideoCaption } from '../../enums/search/search-video-caption';
import { SearchVideoDefinition } from '../../enums/search/search-video-definition';
import { SearchVideoDimension } from '../../enums/search/search-video-dimension';
import { SearchVideoDuration } from '../../enums/search/search-video-duration';
import { SearchVideoEmbeddable } from '../../enums/search/search-video-embeddable';
import { SearchVideoLicense } from '../../enums/search/search-video-license';
import { SearchVideoType } from '../../enums/search/search-video-type';

export class VideoFilterArguments {
  private _shouldHasSubtitles: boolean = false;
  private _videoCaption: SearchVideoCaption;
  private _videoCategoryId: string;
  private _videoDefinition: SearchVideoDefinition;
  private _videoDimension: SearchVideoDimension;
  private _videoDuration: SearchVideoDuration;
  private _videoEmbeddable: SearchVideoEmbeddable;
  private _videoLicense: SearchVideoLicense;
  private _videoType: SearchVideoType;

  get shouldHasSubtitles(): boolean {
    return this._shouldHasSubtitles;
  }
  set shouldHasSubtitles(value: boolean) {
    this._shouldHasSubtitles = value;
  }

  get videoCaption(): SearchVideoCaption {
    return this._videoCaption;
  }
  set videoCaption(value: SearchVideoCaption) {
    this._videoCaption = value;
  }

  get videoCategoryId(): string {
    return this._videoCategoryId;
  }
  set videoCategoryId(value: string) {
    this._videoCategoryId = value;
  }

  get videoDefinition(): SearchVideoDefinition {
    return this._videoDefinition;
  }
  set videoDefinition(value: SearchVideoDefinition) {
    this._videoDefinition = value;
  }

  get videoDimension(): SearchVideoDimension {
    return this._videoDimension;
  }
  set videoDimension(value: SearchVideoDimension) {
    this._videoDimension = value;
  }

  get videoDuration(): SearchVideoDuration {
    return this._videoDuration;
  }
  set videoDuration(value: SearchVideoDuration) {
    this._videoDuration = value;
  }

  get videoEmbeddable(): SearchVideoEmbeddable {
    return this._videoEmbeddable;
  }
  set videoEmbeddable(value: SearchVideoEmbeddable) {
    this._videoEmbeddable = value;
  }

  get videoLicense(): SearchVideoLicense {
    return this._videoLicense;
  }
  set videoLicense(value: SearchVideoLicense) {
    this._videoLicense = value;
  }

  get videoType(): SearchVideoType {
    return this._videoType;
  }
  set videoType(value: SearchVideoType) {
    this._videoType = value;
  }
}

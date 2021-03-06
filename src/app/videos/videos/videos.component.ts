import { Component, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { Video } from '../../models/video/video';
import isRequired from 'src/app/decorators/isRequired';
import { ThumbnailSize } from '../../shared/enums/thumbnail-size';
import { Subscription } from 'rxjs';
import { ExceptionConstants } from '../../shared/constants/exception-constants';
import { VideoResource } from '../../shared/enums/resource-properties/video-resource';
import { PageArguments } from '../../shared/arguments/page-arguments';
import { finalize } from 'rxjs/operators';
import { loadVideosCallback } from 'src/app/types';

const MAX_RESULTS_PER_PAGE = 25;
const VIDEO_DESCRIPTION_DISPLAYED_ROWS = 3;
const VIDEO_TITLE_DISPLAYED_ROWS = 2;

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnChanges, OnDestroy {

  @isRequired
  @Input()
  loadVideosCallback: loadVideosCallback;

  thumbnailSize: ThumbnailSize = ThumbnailSize.medium;
  descriptionMaxDisplayedRows: number = VIDEO_DESCRIPTION_DISPLAYED_ROWS;
  titleMaxDisplayedRows: number = VIDEO_TITLE_DISPLAYED_ROWS;

  areMoreVideos: boolean = true;
  isCurrentlyLoading: boolean = false;
  videos: Video[] = [];
  private isFirstPage: boolean = true;
  private nextPageToken: string;
  private subscription: Subscription = new Subscription();

  ngOnChanges(changes: SimpleChanges): void {
    let isInputsNew = false;

    const callbackChanges = changes['loadVideosCallback'];
    if (callbackChanges.isFirstChange()) {
      isInputsNew = true;
    }
    else if (
      callbackChanges.isFirstChange() === false &&
      callbackChanges.previousValue !== callbackChanges.currentValue
    ) {
      isInputsNew = true;
    }

    if (isInputsNew) {
      this.loadMoreVideos();
    }
  }

  loadMoreVideos = (): void => {
    this.validateIfAbleToLoadMoreVideos();

    this.isCurrentlyLoading = true;

    const pageArgument = new PageArguments(MAX_RESULTS_PER_PAGE, this.nextPageToken);
    const resources = [
      VideoResource.snippet,
      VideoResource.contentDetails,
      VideoResource.status,
      VideoResource.statistics,
      VideoResource.player
    ];
    const videoSubscription = this.loadVideosCallback(
      pageArgument,
      resources
    ).pipe(
      finalize(() => {
        this.isCurrentlyLoading = false;
      })
    ).subscribe(
      data => {
        this.nextPageToken = data.nextPageToken;
        this.videos.push(...data.items);

        this.isFirstPage = false;

        this.updateAreMoreVideos();
      },
      error => {
        this.areMoreVideos = false;
      }
    );
    this.subscription.add(videoSubscription);
  }

  private validateIfAbleToLoadMoreVideos(): void {
    if (this.isCurrentlyLoading) {
      throw Error(ExceptionConstants.CURRENTLY_LOADING);
    }
    if (this.areMoreVideos === false) {
      throw Error(ExceptionConstants.NO_MORE_ELEMENTS_TO_LOAD);
    }
  }

  private updateAreMoreVideos(): void {
    if (this.nextPageToken === undefined && this.isFirstPage === false) {
      this.areMoreVideos = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

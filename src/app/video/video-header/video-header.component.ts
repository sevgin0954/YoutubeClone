import { Component, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';

import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Video } from 'src/app/models/video/video';
import { VideoRatingService } from '../services/video-rating.service';
import { RatingType } from 'src/app/shared/enums/rating-type';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import isRequired from 'src/app/decorators/isRequired';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.scss']
})
export class VideoHeaderComponent implements OnChanges {

  @isRequired
  @Input()
  video: Video;

  @ViewChild('likeBtn')
  likeButton: ElementRef;

  @ViewChild('dislikeBtn')
  dislikeButton: ElementRef;

  currentRating: RatingType;
  exceptionMessage = ExceptionConstants.WEB;
  isErrored: boolean = false;
  isLikeButtonPressed: boolean = false;
  isDislikeButtonPressed: boolean = false;
  mainElementId = MainConstants.SKIP_TO_ELEMENT_ID;
  RatingType = RatingType;

  constructor(
    public formatterService: FormatterService,
    private videoRatingService: VideoRatingService
  ) { }

  ngOnChanges(): void {
    this.initRating();
  }

  initRating(): void {
    this.videoRatingService.getRating(this.video.id).subscribe(data => {
      this.currentRating = data;
      if (this.currentRating === RatingType.like) {
        this.isLikeButtonPressed = true;
      }
      else if (this.currentRating === RatingType.dislike) {
        this.isDislikeButtonPressed = true;
      }
    });
  }

  getAriaLabel(buttonType: 'like' | 'dislike', ratingCount: number): string {
    let label = `${buttonType} this video`;

    const isRatingAvailible = ratingCount != null
    if (isRatingAvailible) {
      label += ` along with ${ratingCount} people`;
    }

    return label;
  }

  onThumbClick(clickedRating: RatingType): void {
    this.likeButton.nativeElement.setAttribute('disabled', "");
    this.dislikeButton.nativeElement.setAttribute('disabled', "");

    let newRating: RatingType;
    // If button is already clicked
    if (this.currentRating === clickedRating) {
      newRating = RatingType.none;
    }
    else {
      newRating = clickedRating;
    }

    this.videoRatingService.rate(this.video.id, newRating).subscribe(data => {
      const responseCode = data;
      if (responseCode === 204) {
        this.isLikeButtonPressed = false;
        this.isDislikeButtonPressed = false;

        if (newRating === RatingType.like) {
          this.isLikeButtonPressed = true;

          this.video.statistics.likeCount++;
          if (this.currentRating === RatingType.dislike) {
            this.video.statistics.dislikeCount--;
          }
        }
        else if (newRating === RatingType.dislike) {
          this.isDislikeButtonPressed = true;

          this.video.statistics.dislikeCount++;
          if (this.currentRating === RatingType.like) {
            this.video.statistics.likeCount--;
          }
        }
        // If we trying to unclick button
        else if (newRating === RatingType.none) {
          if (this.currentRating === RatingType.dislike) {
            this.video.statistics.dislikeCount--;
          }
          else if (this.currentRating === RatingType.like) {
            this.video.statistics.likeCount--;
          }
        }

        this.likeButton.nativeElement.removeAttribute('disabled');
        this.dislikeButton.nativeElement.removeAttribute('disabled');

        this.currentRating = newRating;
      }
    },
    error => {
      this.isErrored = true;
    });
  }
}

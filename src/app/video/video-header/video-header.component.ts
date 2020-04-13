import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Video } from 'src/app/models/video/video';
import { VideoRatingService } from '../services/video-rating.service';
import { RatingType } from 'src/app/shared/enums/rating-type';
import { MainConstants } from 'src/app/shared/Constants/main-constants';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.scss']
})
export class VideoHeaderComponent implements AfterViewInit {

  @isRequired
  @Input()
  video: Video;

  @ViewChild('likeBtn')
  likeButton: ElementRef;

  @ViewChild('dislikeBtn')
  dislikeButton: ElementRef;

  currentRating: RatingType;
  RatingType = RatingType;
  mainElementId = MainConstants.SKIP_TO_ELEMENT_ID;

  constructor(
    public formatterService: FormatterService,
    private videoRatingService: VideoRatingService
  ) { }

  ngAfterViewInit(): void {
    this.initRating();
  }

  initRating(): void {
    this.videoRatingService.getRating(this.video.id).subscribe(data => {
      this.currentRating = data;
      if (this.currentRating === RatingType.like) {
        this.likeButton.nativeElement.classList.add('thumb-active-button');
      }
      else if (this.currentRating === RatingType.dislike) {
        this.dislikeButton.nativeElement.classList.add('thumb-active-button');
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
        this.likeButton.nativeElement.classList.remove('thumb-active-button');
        this.dislikeButton.nativeElement.classList.remove('thumb-active-button');

        if (newRating === RatingType.like) {
          this.likeButton.nativeElement.classList.add('thumb-active-button');
          this.video.statistics.likeCount++;
          if (this.currentRating === RatingType.dislike) {
            this.video.statistics.dislikeCount--;
          }
        }
        else if (newRating === RatingType.dislike) {
          this.dislikeButton.nativeElement.classList.add('thumb-active-button');
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
      else {
        // TODO: Throw exception
      }
    });
  }
}

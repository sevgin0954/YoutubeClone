import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription as RxjsSubscribtion } from 'rxjs';
import { RatingType } from 'src/app/shared/enums/rating-type';
import { Video } from 'src/app/models/video/video';
import { VideoService } from 'src/app/services-singleton/video.service';
import { YoutubeIframeService } from 'src/app/video/services/youtube-iframe.service';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Channel } from 'src/app/models/channel/channel';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { concatMap } from 'rxjs/operators';
import { VideoRatingService } from '../services/video-rating.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit, OnDestroy {

  RatingType = RatingType;
  currentRating: RatingType;
  channel: Channel;
  video: Video;
  maxDisplayedCharacters: number = 120;
  private subscribtion: RxjsSubscribtion;

  @ViewChild('likeBtn', { static: false }) likeButton: ElementRef;
  @ViewChild('dislikeBtn', { static: false }) dislikeButton: ElementRef;

  constructor(
    public formatterService: FormatterService,
    private route: ActivatedRoute,
    private channelService: ChannelService,
    private videoRatingService: VideoRatingService,
    private youtubeIframeService: YoutubeIframeService
  ) { }

  ngOnInit(): void {
    this.video = this.route.snapshot.data['video'];

    this.youtubeIframeService.init(this.video.id);

    const channelId = this.video.snippet.channelId;
    this.subscribtion = this.channelService.getByIds([channelId], null, 1).subscribe(channel => {
      this.channel = channel.items[0];
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

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

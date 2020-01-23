import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services-singleton/video.service';
import { Video } from '../models/video/video';
import { FormatterService } from '../services-singleton/formatter.service';
import { YoutubeIframeService } from '../services-singleton/youtube-iframe.service';
import { RatingType } from '../shared/enums/rating-type';
import { ChannelService } from '../services-singleton/channel.service';
import { Channel } from '../models/channel/channel';
import { SubscriptionsService } from '../services-singleton/subscriptions.service';
import { Subscription } from '../models/subscribption/subscription';
import { concatMap } from 'rxjs/operators';
import { Constants } from '../shared/constants';
import { CommentThreadOrder } from '../shared/enums/comment-thread-order';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {

  baseChannelUrl: string = Constants.BASE_CHANNEL_URL;
  RatingType = RatingType;
  currentRating: RatingType;
  videoId: string;
  video: Video;
  channel: Channel;
  isSubscribed: boolean;
  subscription: Subscription;
  maxDisplayedCharacters: number = 120;

  @ViewChild('likeBtn', { static: false }) likeButton: ElementRef;
  @ViewChild('dislikeBtn', { static: false }) dislikeButton: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private youtubeIframeService: YoutubeIframeService,
    private channelService: ChannelService,
    private subscriptionsService: SubscriptionsService,
    public formatterService: FormatterService
  ) { }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url;
    this.videoId = currentUrl[1].toString();

    this.youtubeIframeService.init(this.videoId);

    this.videoService.getById(this.videoId).pipe(
      concatMap(video => {
        this.video = video;

        return this.channelService.getById(this.video.snippet.channelId);
      }),
      concatMap(channel => {
        this.channel = channel;

        return this.subscriptionsService.getById(this.channel.id);
      })
    ).subscribe(subscribtion => {
      if (subscribtion) {
        this.isSubscribed = true;
        this.subscription = subscribtion;
      }
      else {
        this.isSubscribed = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.initRating();
  }

  initRating(): void {
    this.videoService.getRating(this.videoId).subscribe(data => {
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

    this.videoService.rate(this.videoId, newRating).subscribe(data => {
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

  onSubscribe(): void {
    this.subscriptionsService.subscribe(this.channel.id).subscribe(data => {
      this.isSubscribed = true;
      this.subscription = data;
    });
  }

  onUnsubscribe(): void {
    this.subscriptionsService.unsubscribe(this.subscription.id).subscribe(data => {
      if (data >= 200 && data <= 299) {
        this.isSubscribed = false;
        this.subscription = undefined;
      }
    });
  }
}

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services-singleton/video.service';
import { Video } from '../models/video/video';
import { FormatterService } from '../services-singleton/formatter.service';
import { YoutubeIframeService } from '../services-singleton/youtube-iframe.service';
import { RatingType } from '../shared/enums/rating-type';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, AfterViewInit {

  // TODO: Move to glabal constant
  baseChannelUrl: string = 'https://www.youtube.com/user/';

  RatingType = RatingType;
  rating: RatingType;
  videoId: string;
  video: Video;
  @ViewChild('likeBtn', { static: false }) likeButton: ElementRef;
  @ViewChild('dislikeBtn', { static: false }) dislikeButton: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private youtubeIframeService: YoutubeIframeService,
    public formatterService: FormatterService
  ) { }

  ngOnInit() {
    const currentUrl = this.route.snapshot.url;
    this.videoId = currentUrl[1].toString();

    this.youtubeIframeService.init(this.videoId);

    this.videoService.getById(this.videoId).subscribe(data => {
      this.video = data;
      console.log(this.video)
    });
  }

  ngAfterViewInit(): void {
    this.videoService.getRating(this.videoId).subscribe(data => {
      this.rating = data;
      if (this.rating === RatingType.like) {
        this.likeButton.nativeElement.classList.add('thumb-active-button');
      }
      else if (this.rating === RatingType.dislike) {
        this.dislikeButton.nativeElement.classList.add('thumb-active-button');
      }
    });
  }

  onThumbClick(clickedRating: RatingType): void {
    this.likeButton.nativeElement.setAttribute('disabled', "");
    this.dislikeButton.nativeElement.setAttribute('disabled', "");

    let newRating: RatingType;
    // If button is already clicked
    if (this.rating === clickedRating) {
      newRating = RatingType.none;
    }
    else {
      newRating = clickedRating;
    }

    this.videoService.rate(this.videoId, newRating).subscribe(data => {
      const ratingResult = data;
      if (ratingResult === 204) {
        this.likeButton.nativeElement.classList.remove('thumb-active-button');
        this.dislikeButton.nativeElement.classList.remove('thumb-active-button');

        if (newRating === RatingType.like) {
          this.likeButton.nativeElement.classList.add('thumb-active-button');
          this.video.statistics.likeCount++;
          if (this.rating === RatingType.dislike) {
            this.video.statistics.dislikeCount--;
          }
        }
        else if (newRating === RatingType.dislike) {
          this.dislikeButton.nativeElement.classList.add('thumb-active-button');
          this.video.statistics.dislikeCount++;
          if (this.rating === RatingType.like) {
            this.video.statistics.likeCount--;
          }
        }
        // If we trying to unclick thumb
        else if (newRating === RatingType.none) {
          if (this.rating === RatingType.dislike) {
            this.video.statistics.dislikeCount--;
          }
          else if (this.rating === RatingType.like) {
            this.video.statistics.likeCount--;
          }
        }

        this.likeButton.nativeElement.removeAttribute('disabled');
        this.dislikeButton.nativeElement.removeAttribute('disabled');

        this.rating = newRating;
      }
      else {
        // TODO: Throw exception
      }
    });
  }
}

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { RatingType } from 'src/app/shared/enums/rating-type';
import { Url } from 'src/app/shared/url';
import { MainConstants } from 'src/app/shared/constants/main-constants';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';
import { Config } from 'protractor';
import { DataValidator } from 'src/app/shared/validation/data-validator';

const BASE_URL = MainConstants.YOUTUBE_BASE_URL + '/videos'

@Injectable()
export class VideoRatingService {

constructor(
  private http: HttpClient
) { }

  getRating(id: string): Observable<RatingType> {
    DataValidator.validateString(id, 'id');

    const queryParams = {
      id: id
    };
    const url = new Url(BASE_URL, ['getRating'], queryParams);
    const data$ = this.http.get(url.toString())
      .pipe(
        pluck('items'),
        map<any, RatingType>(data => {
          const ratingName: string = data[0].rating;
          const ratingType: RatingType = RatingType[ratingName];

          return ratingType;
        })
      );

    return data$;
  }

  rate(id: string, rating: RatingType): Observable<number> {
    DataValidator.validateString(id, 'id');
    DataValidator.nullOrUndefinied(rating, 'rating');

    const queryParams = {
      id: id,
      rating: RatingType[rating]
    };
    const url = new Url(BASE_URL, ['rate'], queryParams);
    const data$ = this.http.post<Config>(url.toString(), {}, { observe: 'response' }).pipe(
      map(data => data.status)
    );

    return data$;
  }
}

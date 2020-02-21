import { Injectable } from '@angular/core';

import { HttpConfigService } from 'src/app/services-singleton/http-config.service';
import { Observable } from 'rxjs';
import { RatingType } from 'src/app/shared/enums/rating-type';
import { Url } from 'src/app/shared/url';
import { Constants } from 'src/app/shared/constants';
import { HttpClient } from '@angular/common/http';
import { pluck, map } from 'rxjs/operators';

const BASE_URL = Constants.BASE_URL + '/videos'

@Injectable()
export class VideoRatingService {

constructor(
  private http: HttpClient,
  private httpConfigService: HttpConfigService
) { }

  getRating(id: string): Observable<RatingType> {
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
    const queryParams = {
      id: id,
      rating: RatingType[rating]
    };
    const url = new Url(BASE_URL, ['rate'], queryParams);
    const data$ = this.httpConfigService.getConfigPostResponse(url.toString(), {}).pipe(
      map(data => data.status)
    );

    return data$;
  }
}

import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from '../video.service';
import { Video } from 'src/app/models/video/video';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';
import { DataValidator } from 'src/app/shared/Validation/data-validator';

@Injectable({
  providedIn: 'root'
})
export class VideoResolverService implements Resolve<Video> {

  constructor(
    private videoService: VideoService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
    const id = route.params['id'];

    DataValidator.emptyString(id, 'id');

    const resources = [
      VideoResource.contentDetails,
      VideoResource.snippet,
      VideoResource.statistics
    ];
    const video$ = this.videoService.getByIds([id], resources).pipe(
      map(data => data[0])
    );

    return video$;
  }
}

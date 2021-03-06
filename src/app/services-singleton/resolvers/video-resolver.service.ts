import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from '../video.service';
import { Video } from 'src/app/models/video/video';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';
import { DataValidator } from 'src/app/shared/validation/data-validator';

const MAX_DIMENSIONS = 8192;

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
      VideoResource.statistics,
      VideoResource.player
    ];
    const maxHeight = MAX_DIMENSIONS;
    const maxWidth = MAX_DIMENSIONS;
    const video$ = this.videoService.getById(id, resources, maxHeight, maxWidth).pipe(
      map(data => data.items[0])
    );

    return video$;
  }
}

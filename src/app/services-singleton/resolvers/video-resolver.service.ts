import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from '../video.service';
import { Video } from 'src/app/models/video/video';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoResolverService implements Resolve<Video> {

  constructor(
    private videoService: VideoService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
    const id = route.params['id'];
    const video$ = this.videoService.getByIds(id).pipe(
      map(data => data[0])
    );

    return video$;
  }
}

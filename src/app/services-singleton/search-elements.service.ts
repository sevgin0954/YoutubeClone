import { Injectable } from '@angular/core';
import { ResourceKind } from 'src/app/shared/enums/resource-kind';
import { Search } from 'src/app/models/search/search';

@Injectable({
  providedIn: 'root'
})
export class SearchElementsService {

  getId(element: Search): string {
    let id = null;

    if (element.id.kind == ResourceKind[ResourceKind["youtube#channel"]]) {
      id = element.id.channelId;
    }
    else if (element.id.kind == ResourceKind[ResourceKind["youtube#playlist"]]) {
      id = element.id.playlistId;
    }
    else if (element.id.kind == ResourceKind[ResourceKind["youtube#video"]]) {
      id = element.id.videoId;
    }

    return id;
  }
}

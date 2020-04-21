import { Injectable } from '@angular/core';

import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { VideoService } from 'src/app/services-singleton/video.service';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';

type OnLoadElementsCallback = (elements: SearchElement[]) => any;

@Injectable()
export class SearchElementsLoadService {

  constructor(
    private channelService: ChannelService,
    private playlistService: PlaylistService,
    private videoService: VideoService
  ) { }

  tryLoadChannels(ids: string[], callback: OnLoadElementsCallback): void {
    if (ids.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(ids.length);
    const resources = [
      ChannelResource.snippet,
      ChannelResource.statistics
    ];
    this.channelService.getByIds(ids, pageArgs, resources)
    .subscribe(data => {
      callback(data.items);
    });
  }

  tryLoadPlaylists(ids: string[], callback: OnLoadElementsCallback): void {
    if (ids.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(ids.length);
    const resources = [
      PlaylistResource.snippet,
      PlaylistResource.contentDetails
    ];
    this.playlistService.getByIds(ids, pageArgs, resources)
    .subscribe(data => {
      callback(data.items);
    });
  }

  tryLoadVideos(ids: string[], callback: OnLoadElementsCallback): void {
    if (ids.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(ids.length);
    const resources = [
      VideoResource.snippet,
      VideoResource.statistics
    ];
    this.videoService.getByIds(ids, pageArgs, resources)
    .subscribe(data => {
      callback(data.items);
    });
  }
}

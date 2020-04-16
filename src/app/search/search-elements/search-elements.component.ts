import { Component, Input, OnChanges, DoCheck, ChangeDetectorRef } from '@angular/core';

import { Search } from 'src/app/models/search/search';
import isRequired from 'src/app/decorators/isRequired';
import { VideoService } from 'src/app/services-singleton/video.service';
import { ChannelService } from 'src/app/services-singleton/channel.service';
import { PlaylistService } from 'src/app/services-singleton/playlist.service';
import { ResourceKind } from 'src/app/shared/enums/resource-kind';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { ChannelResource } from 'src/app/shared/enums/resource-properties/channel-resource';
import { PlaylistResource } from 'src/app/shared/enums/resource-properties/playlist-resource';
import { VideoResource } from 'src/app/shared/enums/resource-properties/video-resource';

@Component({
  selector: 'app-search-elements',
  templateUrl: './search-elements.component.html',
  styleUrls: ['./search-elements.component.scss']
})
export class SearchElementsComponent implements DoCheck {

  @Input()
  elements: Search[];

  elementIds: string[] = [];
  elementIdsElements: { [id: string]: any } = { };

  newChannelElementIds: string[] = [];
  newPlaylistElementIds: string[] = [];
  newVideoElementIds: string[] = [];

  constructor(
    private changeDetecionRef: ChangeDetectorRef,
    private channelService: ChannelService,
    private playlistService: PlaylistService,
    private videoService: VideoService
  ) { }

  ngDoCheck(): void {
    console.log(this.elements)
    if (this.elements.length > 0) {
      this.changeDetecionRef.detectChanges();
    }

    this.updateNewElementIds();

    // this.tryLoadChannels();
    // this.tryLoadPlaylists();
    // this.tryLoadVideos();
  }

  updateNewElementIds(): void {
    this.newChannelElementIds = [];
    this.newPlaylistElementIds = [];
    this.newVideoElementIds = [];

    this.elements.forEach(currentElement => {
      if (currentElement.id.kind == ResourceKind[ResourceKind["youtube#channel"]]) {
        const id = currentElement.id.channelId;
        this.tryAddElementId(id, this.newChannelElementIds);
      }
      else if (currentElement.id.kind == ResourceKind[ResourceKind["youtube#playlist"]]) {
        const id = currentElement.id.playlistId;
        this.tryAddElementId(id, this.newChannelElementIds);
      }
      else if (currentElement.id.kind == ResourceKind[ResourceKind["youtube#video"]]) {
        const id = currentElement.id.videoId;
        this.tryAddElementId(id, this.newChannelElementIds);
      }
    });
  }

  private tryAddElementId(id: string, elements: string[]): void {
    if (this.elementIdsElements[id] == null) {
      elements.push(id);
      this.elementIds.push(id);
    }
  }

  tryLoadChannels(): void {
    if (this.newChannelElementIds.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(this.newChannelElementIds.length);
    const resources = [
      ChannelResource.snippet,
      ChannelResource.statistics
    ];
    this.channelService.getByIds(this.newChannelElementIds, pageArgs, resources)
    .subscribe(data => {
      this.addElements(data.items);
    });
  }

  tryLoadPlaylists(): void {
    if (this.newPlaylistElementIds.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(this.newPlaylistElementIds.length);
    const resources = [
      PlaylistResource.snippet
    ];
    this.playlistService.getByIds(this.newChannelElementIds, pageArgs, resources)
    .subscribe(data => {
      this.addElements(data.items);
    });
  }

  tryLoadVideos(): void {
    if (this.newVideoElementIds.length === 0) {
      return;
    }

    const pageArgs = new PageArguments(this.newVideoElementIds.length);
    const resources = [
      VideoResource.snippet,
      VideoResource.statistics
    ];
    this.videoService.getByIds(this.newChannelElementIds, pageArgs, resources)
    .subscribe(data => {
      this.addElements(data.items);
    });
  }

  private addElements(elements: { id: string }[]): void {
    elements.forEach(currentItem => {
      const id = currentItem.id;
      this.elementIdsElements[id] = currentItem;
    });
  }
}

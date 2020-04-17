import { Component, Input, DoCheck, IterableDiffers, IterableDiffer } from '@angular/core';

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
import { Channel } from 'src/app/models/channel/channel';
import { Playlist } from 'src/app/models/playlist/playlist';
import { Video } from 'src/app/models/video/video';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';

type Element = {
  id: string,
  kind: string
}

type ElementIdsElements = {
  [id: string]: Element
}

@Component({
  selector: 'app-search-elements',
  templateUrl: './search-elements.component.html',
  styleUrls: ['./search-elements.component.scss']
})
export class SearchElementsComponent implements DoCheck {

  @isRequired
  @Input()
  elements: Search[] = [];

  descriptionMaxDisplayedRows: number = 3;

  elementIds: string[] = [];
  elementIdsElements: ElementIdsElements = { };

  newChannelElementIds: string[] = [];
  newPlaylistElementIds: string[] = [];
  newVideoElementIds: string[] = [];

  ResourceKind = ResourceKind;
  thumbnailSize = ThumbnailSize.medium;
  titleMaxDisplayedRows: number = 2;

  private iterableDiffer: IterableDiffer<Search>;
  private previousElementsLength: number = 0;

  constructor(
    private channelService: ChannelService,
    iterable: IterableDiffers,
    private playlistService: PlaylistService,
    private videoService: VideoService
  ) {
    this.iterableDiffer = iterable.find(this.elements).create();
  }

  getChannelElement(id: string): Channel {
    return this.elementIdsElements[id] as Channel;
  }

  getPlaylistElement(id: string): Playlist {
    return this.elementIdsElements[id] as Playlist;
  }

  getVideoElement(id: string): Video {
    return this.elementIdsElements[id] as Video;
  }

  getElementResourceKind(id: string): ResourceKind {
    const kind = ResourceKind[this.elementIdsElements[id].kind];

    return kind;
  }

  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.elements);
    if (changes == null) {
      return;
    }

    this.previousElementsLength = this.elements.length;

    this.updateNewElementIds();

    this.tryLoadChannels();
    this.tryLoadPlaylists();
    this.tryLoadVideos();
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
        this.tryAddElementId(id, this.newPlaylistElementIds);
      }
      else if (currentElement.id.kind == ResourceKind[ResourceKind["youtube#video"]]) {
        const id = currentElement.id.videoId;
        this.tryAddElementId(id, this.newVideoElementIds);
      }
    });
  }

  private tryAddElementId(id: string, elements: string[]): void {
    if (this.elementIdsElements[id] === undefined) {
      elements.push(id);
      this.elementIds.push(id);
      this.elementIdsElements[id] = null;
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
      PlaylistResource.snippet,
      PlaylistResource.contentDetails
    ];
    this.playlistService.getByIds(this.newPlaylistElementIds, pageArgs, resources)
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
    this.videoService.getByIds(this.newVideoElementIds, pageArgs, resources)
    .subscribe(data => {
      this.addElements(data.items);
    });
  }

  private addElements(elements: Element[]): void {
    elements.forEach(currentItem => {
      const id = currentItem.id;
      this.elementIdsElements[id] = currentItem;
    });
  }
}

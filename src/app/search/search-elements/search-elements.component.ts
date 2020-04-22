import { Component, Input, DoCheck, IterableDiffers, IterableDiffer, EventEmitter, AfterViewChecked, Output } from '@angular/core';

import { Search } from 'src/app/models/search/search';
import isRequired from 'src/app/decorators/isRequired';
import { ResourceKind } from 'src/app/shared/enums/resource-kind';
import { Channel } from 'src/app/models/channel/channel';
import { Playlist } from 'src/app/models/playlist/playlist';
import { Video } from 'src/app/models/video/video';
import { ThumbnailSize } from 'src/app/shared/enums/thumbnail-size';
import { SearchElementsLoadService } from '../services/search-elements-load.service';
import { SearchElementsService } from 'src/app/services-singleton/search-elements.service';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';

@Component({
  selector: 'app-search-elements',
  templateUrl: './search-elements.component.html',
  styleUrls: ['./search-elements.component.scss']
})
export class SearchElementsComponent implements DoCheck, AfterViewChecked {

  @isRequired
  @Input()
  elements: Search[] = [];

  @Output()
  searchElementsLoad = new EventEmitter<number>();

  descriptionMaxDisplayedRows: number = 3;
  displayedElements: SearchElement[] = [];
  elementIds: string[] = [];
  ResourceKind = ResourceKind;
  thumbnailSize = ThumbnailSize.medium;
  titleMaxDisplayedRows: number = 2;

  private idsLoadedElementIndexes: { [id: string]: number } = { };
  private iterableDiffer: IterableDiffer<Search>;
  private hasChanges: boolean = true;
  private newLoadedElements: SearchElement[] = [];
  private newLoadedElementsIndex: number = 0;
  private newChannelElementIds: string[] = [];
  private newPlaylistElementIds: string[] = [];
  private newVideoElementIds: string[] = [];
  private previousElementsLength: number = 0;

  constructor(
    iterable: IterableDiffers,
    private searchElementsLoadService: SearchElementsLoadService,
    private searchElementsService: SearchElementsService
  ) {
    this.iterableDiffer = iterable.find(this.elements).create();
  }

  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.elements);
    if (changes == null) {
      return;
    }

    this.validateChange();

    this.hasChanges = true;
    this.previousElementsLength = this.elements.length;

    this.updateFields();

    this.searchElementsLoadService
      .tryLoadChannels(this.newChannelElementIds, this.onElementsLoad.bind(this));
    this.searchElementsLoadService
      .tryLoadPlaylists(this.newPlaylistElementIds, this.onElementsLoad.bind(this));
    this.searchElementsLoadService
      .tryLoadVideos(this.newVideoElementIds, this.onElementsLoad.bind(this));
  }

  private validateChange(): void {
    // Throws an error if elements are not unique
    const elementIds = this.elements.map(e => this.searchElementsService.getId(e));
    const uniqueElementLength = [...new Set(elementIds)].length;
    const areElementsUnique = uniqueElementLength === this.elements.length;
    if (areElementsUnique === false) {
      throw Error(ExceptionConstants.NOT_UNIQUE_COLLECTION);
    }

    // Throws an error if currently loading
    if (this.previousElementsLength !== this.displayedElements.length) {
      throw Error(ExceptionConstants.CURRENTLY_LOADING);
    }
  }

  private updateFields(): void {
    this.newLoadedElements = [];
    this.newLoadedElementsIndex = 0;

    const newElements = this.getNewElements();
    this.updateNewElementIds(newElements);
    this.addElementsToIdsIndexes(newElements);
  }

  private getNewElements(): Search[] {
    const newElements: Search[] = [];

    this.elements.forEach(element => {
      const elementId = this.searchElementsService.getId(element);
      const isElementNew = this.idsLoadedElementIndexes[elementId] == null;
      if (isElementNew) {
        newElements.push(element);
      }
    });

    return newElements;
  }

  private updateNewElementIds(newElements: Search[]): void {
    this.newChannelElementIds = [];
    this.newPlaylistElementIds = [];
    this.newVideoElementIds = [];

    newElements.forEach(element => {
      if (element.id.kind === ResourceKind[ResourceKind["youtube#channel"]]) {
        const id = element.id.channelId;
        this.newChannelElementIds.push(id);
      }
      else if (element.id.kind === ResourceKind[ResourceKind["youtube#playlist"]]) {
        const id = element.id.playlistId;
        this.newPlaylistElementIds.push(id);
      }
      else if (element.id.kind === ResourceKind[ResourceKind["youtube#video"]]) {
        const id = element.id.videoId;
        this.newVideoElementIds.push(id);
      }
    });
  }

  private addElementsToIdsIndexes(newElements: Search[]): void {
    newElements.forEach((element, index) => {
      const id = this.searchElementsService.getId(element);
      this.idsLoadedElementIndexes[id] = index;
    });
  }

  private onElementsLoad(elements: SearchElement[]): void {
    this.addNewLoadedElements(elements);
    this.updateDisplayedElements();
  }

  private addNewLoadedElements(elements: SearchElement[]): void {
    elements.forEach(element => {
      const elementIndex = this.idsLoadedElementIndexes[element.id];
      this.newLoadedElements[elementIndex] = element;
    });
  }

  private updateDisplayedElements(): void {
    while (this.newLoadedElementsIndex < this.newLoadedElements.length) {
      const element = this.newLoadedElements[this.newLoadedElementsIndex];

      if (element == null) {
        break;
      }

      this.displayedElements.push(element);
      this.newLoadedElementsIndex++;
    }
  }

  ngAfterViewChecked(): void {
    const hasNewElemeentsLoaded =
      this.displayedElements.length === this.elements.length;
    if (hasNewElemeentsLoaded && this.hasChanges) {
      this.searchElementsLoad.emit(this.displayedElements.length);
      this.hasChanges = false;
    }
  }

  getChannelElement(element: SearchElement): Channel {
    return element as Channel;
  }

  getPlaylistElement(element: SearchElement): Playlist {
    return element as Playlist;
  }

  getVideoElement(element: SearchElement): Video {
    return element as Video;
  }

  getElementResourceKind(element: SearchElement): ResourceKind {
    const kind = ResourceKind[element.kind];

    return kind;
  }
}

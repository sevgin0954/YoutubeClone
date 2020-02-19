import { PlaylistElementService } from './services/playlist-element.service';
import { ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';

export class BasePlaylistComponent {
  constructor(
    private playlistElementService: PlaylistElementService,
    protected changeDetectorRef: ChangeDetectorRef
  ) { }

  onPlaylistResize(playlistElements: QueryList<ElementRef>): void {
    const playlistNativeElements = playlistElements.map(e => e.nativeElement);
    this.playlistElementService.tryShowLeftHiddenElements(playlistNativeElements);

    this.changeDetectorRef.markForCheck();
  }
}

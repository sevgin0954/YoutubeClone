import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-playlist-header',
  templateUrl: './playlist-header.component.html',
  styleUrls: ['./playlist-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistHeaderComponent {

  @Input()
  title: string;
}

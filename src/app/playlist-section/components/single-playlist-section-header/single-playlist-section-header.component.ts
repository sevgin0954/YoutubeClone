import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-single-playlist-section-header',
  templateUrl: './single-playlist-section-header.component.html',
  styleUrls: ['./single-playlist-section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaylistHeaderComponent {

  @isRequired
  @Input()
  imgUrl: string;

  @isRequired
  @Input()
  title: string;

  maxDisplayedRows: number = 2;
}

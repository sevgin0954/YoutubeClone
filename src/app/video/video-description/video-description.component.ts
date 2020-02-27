import { Component, Input } from '@angular/core';
import { Channel } from 'src/app/models/channel/channel';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent {

  @Input() channel: Channel;
  @Input() text: string;
  maxDisplayedRows: number = 3;
}

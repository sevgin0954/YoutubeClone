import { Component, Input } from '@angular/core';
import { Video } from 'src/app/models/video/video';
import { FormatterService } from 'src/app/services-singleton/formatter.service';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss']
})
export class VideoInfoComponent {

  @Input() video: Video;
  @Input() titleMaxDisplayedRows: number;

  constructor(
    public formatterService: FormatterService
  ) { }

}

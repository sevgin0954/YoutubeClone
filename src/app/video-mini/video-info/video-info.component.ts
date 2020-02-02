import { Component, Input } from '@angular/core';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import { Video } from 'src/app/models/video/video';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss']
})
export class VideoInfoComponent {

  @Input() video: Video;

  constructor(
    public formatterService: FormatterService
  ) { }

}

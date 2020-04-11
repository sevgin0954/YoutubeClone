import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Video } from 'src/app/models/video/video';
import { FormatterService } from 'src/app/services-singleton/formatter.service';
import isRequired from 'src/app/decorators/isRequired';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.component.html',
  styleUrls: ['./video-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoInfoComponent {

  @isRequired
  @Input()
  video: Video;

  @isRequired
  @Input()
  titleMaxDisplayedRows: number;

  constructor(
    public formatterService: FormatterService
  ) { }

}

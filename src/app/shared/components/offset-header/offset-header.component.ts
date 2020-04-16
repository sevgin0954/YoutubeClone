import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import isRequired from 'src/app/decorators/isRequired';
import { MainConstants } from '../../constants/main-constants';

@Component({
  selector: 'app-offset-header',
  templateUrl: './offset-header.component.html',
  styleUrls: ['./offset-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffsetHeaderComponent {

  @isRequired
  @Input()
  text: string;

  mainContentId: string = MainConstants.SKIP_TO_ELEMENT_ID;
}

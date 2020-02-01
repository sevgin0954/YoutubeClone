import { Component, Input } from '@angular/core';

import { SnippetStyle } from 'src/app/shared/enums/snippet-style';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss']
})
export class MultipleChannelsPlaylistComponent {

  @Input() channelIds: string[];
  @Input() title: string;
  @Input() style: SnippetStyle;
}

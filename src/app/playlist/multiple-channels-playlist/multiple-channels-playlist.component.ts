import { Component, Input } from '@angular/core';
import { ChannelSectionStyle } from 'src/app/shared/enums/channel-section-style';
import { ChannelSection } from 'src/app/models/channel-section/channel-section';

@Component({
  selector: 'app-multiple-channels-playlist',
  templateUrl: './multiple-channels-playlist.component.html',
  styleUrls: ['./multiple-channels-playlist.component.scss']
})
export class MultipleChannelsPlaylistComponent {

  @Input() private channelSection: ChannelSection;
  @Input() title: string;
  @Input() style: ChannelSectionStyle;
  snippetStyle: typeof ChannelSectionStyle = ChannelSectionStyle;
}

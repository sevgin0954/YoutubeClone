import { Component, Input } from '@angular/core';

import { Search } from 'src/app/models/search/search';
import isRequired from 'src/app/decorators/isRequired';
import { ResourceKind } from 'src/app/shared/enums/resource-kind';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  @isRequired
  @Input()
  searchResult: Search;

  resourceChannelKind = ResourceKind[ResourceKind["youtube#channel"]];
  resourcePlaylistKind = ResourceKind[ResourceKind["youtube#playlist"]];
  resourceVideoKind = ResourceKind[ResourceKind["youtube#video"]];
}

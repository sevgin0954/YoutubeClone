import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ResourceKind } from 'src/app/shared/enums/resource-kind';
import { SearchService } from 'src/app/services-singleton/search.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { Search } from 'src/app/models/search/search';

const MAX_RESULTS_PER_PAGE = 25;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  resourceChannelKind = ResourceKind[ResourceKind["youtube#channel"]];
  resourcePlaylistKind = ResourceKind[ResourceKind["youtube#playlist"]];
  resourceVideoKind = ResourceKind[ResourceKind["youtube#video"]];

  areMoreResults: boolean = true;
  isLoading: boolean = false;
  searchResults: Search[] = [];
  private isFirstPage: boolean = true;
  private pageToken: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.loadMoreResults();
  }

  loadMoreResults = (): void => {
    this.isLoading = true;

    if (this.pageToken == null && this.isFirstPage === false) {
      this.areMoreResults = false;
      return;
    }

    const query = this.route.snapshot.params['query'];

    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE, this.pageToken);
    this.searchService.getResults(query, pageArgs).subscribe(data => {
      this.searchResults.push(...data.items);
      this.pageToken = data.nextPageToken;

      this.isLoading = false;
    });
  }
}

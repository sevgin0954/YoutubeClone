import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { Search } from 'src/app/models/search/search';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';
import { SearchElementsService } from 'src/app/services-singleton/search-elements.service';
import { SearchService } from 'src/app/services-singleton/search.service';

const MAX_RESULTS_PER_PAGE = 25;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  areMoreResults: boolean;
  exceptionMessage = ExceptionConstants.WEB;
  isErrored: boolean;
  isLoading: boolean;
  searchResults: Search[];
  title = 'Search results';

  private searchResultIds: Set<string>;
  private pageToken: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private searchElementService: SearchElementsService
  ) { }

  ngOnInit(): void {
    this.initFields();

    this.route.params.subscribe(params => {
      this.initFields();
      this.loadMoreResults();
    });
  }

  private initFields(): void {
    this.areMoreResults = true;
    this.isErrored = false;
    this.isLoading = false;
    this.searchResults = [];

    // Privats fields
    this.searchResultIds = new Set<string>();
    this.pageToken = undefined;
  }

  loadMoreResults = (): void => {
    this.isLoading = true;

    const query = this.route.snapshot.params['query'];

    const pageArgs = new PageArguments(MAX_RESULTS_PER_PAGE, this.pageToken);
    this.searchService.getResults(query, pageArgs)
    .subscribe(data => {
      this.addDistinctSearchResults(data.items);
      this.pageToken = data.nextPageToken;

      if (this.pageToken == null) {
        this.areMoreResults = false;
      }
    }, error => {
      this.areMoreResults = false;
      this.isErrored = true;
    });
  }

  private addDistinctSearchResults(results: Search[]): void {
    results.forEach(currentResult => {
      const id = this.searchElementService.getId(currentResult);

      if (this.searchResultIds.has(id) === false) {
        this.searchResults.push(currentResult);
        this.searchResultIds.add(id);
      }
    });
  }

  onSearchElementLoaded(): void {
    this.isLoading = false;
  }
}

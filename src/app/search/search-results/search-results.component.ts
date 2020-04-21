import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from 'src/app/services-singleton/search.service';
import { PageArguments } from 'src/app/shared/arguments/page-arguments';
import { Search } from 'src/app/models/search/search';
import { ExceptionConstants } from 'src/app/shared/constants/exception-constants';

const MAX_RESULTS_PER_PAGE = 25;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  areMoreResults: boolean = true;
  exceptionMessage = ExceptionConstants.WEB;
  isErrored: boolean = false;
  isLoading: boolean = false;
  searchResults: Search[] = [];
  title = 'Search results';
  private pageToken: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadMoreResults();
    });
  }

  loadMoreResults = (): void => {
    this.isLoading = true;

    const query = this.route.snapshot.params['query'];

    const pageArgs = new PageArguments(5, this.pageToken);
    this.searchService.getResults(query, pageArgs)
    .subscribe(data => {
      this.searchResults.push(...data.items);
      this.pageToken = data.nextPageToken;

      if (this.pageToken == null) {
        this.areMoreResults = false;
      }
    }, error => {
      this.areMoreResults = false;
      this.isErrored = true;
    });
  }

  onSearchElementLoaded(): void {
    this.isLoading = false;
  }
}

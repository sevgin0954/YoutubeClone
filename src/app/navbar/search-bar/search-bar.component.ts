import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SuggestionService } from '../services/suggestion.service';
import { switchMap, filter, map, debounceTime, tap } from 'rxjs/operators';
import { RegionCode } from 'src/app/shared/enums/region-code';
import isRequired from 'src/app/decorators/isRequired';
import isInRange from 'src/app/decorators/isInRange';

const SEARCH_INPUT_NAME = 'search';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @isInRange(1)
  @isRequired
  @Input()
  maxResults: number;

  @isRequired
  @Input()
  regionCode: RegionCode;

  @Output()
  appSubmit = new EventEmitter<string>();

  isInputFocused: boolean = false;
  shouldShowSuggestions: boolean = false;
  results: string[] = [];
  searchForm: FormGroup;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private suggestionService: SuggestionService
  ) { }

  isInputEmpty(): boolean {
    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);

    return searchInput.value.trim() === '';
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ''
    });

    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    searchInput.valueChanges.pipe(
      tap(() => {
        this.shouldShowSuggestions = false;
      }),
      debounceTime(500),
      map<string, string>(query => query.trim()),
      filter((query) => query != null && query != ''),
      switchMap((query) => this.suggestionService.getSuggestions(query, RegionCode.EN, 10))
    ).subscribe(results => {
      this.results = results;
      this.shouldShowSuggestions = true;

      this.changeDetectionRef.detectChanges();
    });
  }

  onSuggestionClicked(query: string): void {
    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    searchInput.setValue(query);
  }

  onSubmit(): void {
    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    this.appSubmit.emit(searchInput.value);
  }
}

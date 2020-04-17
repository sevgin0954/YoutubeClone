import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SuggestionService } from '../../search/services/suggestion.service';
import { distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { RegionCode } from 'src/app/shared/enums/region-code';
import isRequired from 'src/app/decorators/isRequired';
import isInRange from 'src/app/decorators/isInRange';
import { Observable } from 'rxjs';

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

  isInputFocuces: boolean = false;
  results$: Observable<string[]>;
  results: string[];
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService
  ) { }
render() {
  console.log('render')
}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ''
    });

    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    this.results$ = searchInput.valueChanges.pipe(
      filter((query) => query != null && query != ''),
      distinctUntilChanged(),
      switchMap((query) => this.suggestionService.getSuggestions(query, RegionCode.EN, 10))
    );
  }

  onSubmit(): void {
    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    this.appSubmit.emit(searchInput.value);
  }
}

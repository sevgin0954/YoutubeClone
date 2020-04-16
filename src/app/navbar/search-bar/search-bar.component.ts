import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SuggestionService } from '../../search/services/suggestion.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
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

  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private suggestionService: SuggestionService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ''
    });

    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    searchInput.valueChanges.pipe(
      debounceTime(400),
      filter((query) => query != null && query != ''),
      distinctUntilChanged(),
      switchMap((query) => this.suggestionService.getSuggestions(query, RegionCode.EN, 10))
    )
    .subscribe(newValue => {
      console.log(newValue);
    });
  }

  onSubmit(): void {
    const searchInput = this.searchForm.get(SEARCH_INPUT_NAME);
    this.appSubmit.emit(searchInput.value);
  }
}

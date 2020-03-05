import { DataValidator } from '../Validation/data-validator';

export class PageArguments {
  constructor(
    private maxResultsCount: number,
    private pageTokenString: string
  ) {
    this.maxResults = maxResultsCount;
    this.pageToken = pageTokenString;
  }

  get maxResults(): number {
    return this.maxResultsCount;
  }

  set maxResults(maxResultsCount: number) {
    DataValidator.minNumber(maxResultsCount, 0, 'maxResults');

    this.maxResultsCount = maxResultsCount;
  }

  get pageToken(): string {
    return this.pageTokenString;
  }

  set pageToken(pageTokenString: string) {
    DataValidator.emptyString(pageTokenString, 'pageToken');
  }
}

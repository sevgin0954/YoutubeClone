import { DataValidator } from '../validation/data-validator';

export class PageArguments {
  private maxResultsCount: number;
  private pageTokenString: string;

  constructor(maxResultsCount: number, pageTokenString?: string) {
    this.maxResults = maxResultsCount;
    this.pageToken = pageTokenString;
  }

  get maxResults(): number {
    return this.maxResultsCount;
  }

  set maxResults(maxResultsCount: number) {
    DataValidator.minNumber(maxResultsCount, 1, 'maxResults');

    this.maxResultsCount = maxResultsCount;
  }

  get pageToken(): string {
    return this.pageTokenString;
  }

  set pageToken(pageTokenString: string) {
    DataValidator.emptyString(pageTokenString, 'pageToken');

    this.pageTokenString = pageTokenString;
  }
}

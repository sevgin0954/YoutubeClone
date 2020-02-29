export class QueryParamsUtility {
  public static tryAddPageToken(queryParams: any, pageToken: string): boolean {
    let isAdded = false;

    if (pageToken) {
      queryParams.pageToken = pageToken;
      isAdded = true;
    }

    return isAdded;
  }
}

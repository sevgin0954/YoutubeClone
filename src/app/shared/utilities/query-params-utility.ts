import { EnumUtility } from './enum-utility';

type EnumType = {
  [num: number]: string;
}

export class QueryParamsUtility {

  public static addResources(queryParams: any, resources: number[], enumType: EnumType): void {
    const part = EnumUtility.join(resources, ',', enumType);
    queryParams.part = part;
  }

  public static tryAddPageToken(queryParams: any, pageToken: string): boolean {
    let isAdded = false;

    if (pageToken) {
      queryParams.pageToken = pageToken;
      isAdded = true;
    }

    return isAdded;
  }
}

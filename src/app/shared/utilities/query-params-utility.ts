import { EnumUtility } from './enum-utility';
import { ExceptionConstants } from '../Constants/exception-constants';

type EnumType = {
  [num: number]: string;
}

export class QueryParamsUtility {

  public static addResources(queryParams: any, resources: number[], enumType: EnumType): void {
    this.validateResources(resources);

    const distinctResources = [...new Set(resources)];
    const part = EnumUtility.join(distinctResources, ',', enumType);
    queryParams.part = part;
  }

  private static validateResources(resources: number[]): void {
    const firstInvalidResourceIndex = resources.findIndex(r => r === undefined || r === null);
    if (firstInvalidResourceIndex >= 0) {
      const exceptionMessage = ExceptionConstants.INVALID_ARGUMENT + ' Argument name: resources';
      throw Error(exceptionMessage);
    }
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

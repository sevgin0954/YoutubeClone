import { EnumUtility } from './enum-utility';
import { DataValidator } from '../validation/data-validator';

type EnumType = {
  [num: number]: string;
}

export class QueryParamsUtility {

  public static add(queryParams: object, name: string, value: string | number): void {
    DataValidator.nullOrUndefinied(name, 'name');
    DataValidator.nullOrUndefinied(value, 'value');

    queryParams[name] = value;
  }

  public static addResources(queryParams: any, resources: number[], enumType: EnumType): void {
    DataValidator.anyNullOrUndefined(resources, 'resources');

    const distinctResources = [...new Set(resources)];
    const part = EnumUtility.join(distinctResources, ',', enumType);
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

  public static tryAddFromGetters(queryParams: object, paramsObj: object): void {
    const descriptorsObj = Object.getOwnPropertyDescriptors(paramsObj);
    const propertyNamesDescriptors = Object.entries(descriptorsObj);

    propertyNamesDescriptors.forEach(propertyNameDescriptor => {
      const propertyName = propertyNameDescriptor[0];
      const descriptor = propertyNameDescriptor[1];

      if (typeof descriptor.get === 'function') {
        const value = descriptor.get();
        if (typeof value === 'string' || typeof value === 'number') {
          this.add(queryParams, propertyName, value);
        }
        else if (typeof value === 'object') {
          this.tryAddFromGetters(queryParams, value);
        }
      }
    });
  }
}

import { EnumType } from 'src/app/types';

export class EnumUtility {
  public static join(enums: any[], separator: string, enumKeys: EnumType): string {
    const stringValues = enums.map(key => enumKeys[key]);
    const joinedValues = stringValues.join(separator);

    return joinedValues;
  }
}

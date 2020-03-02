import { ExceptionConstants } from '../Constants/exception-constants';
import { PageArguments } from '../arguments/page-arguments';
import { StringUtilities } from '../utilities/string-utilities';

export class DataValidator {

  public static emptyCollection<T>(collection: T[], argumentName: string): void {
    if (collection.length === 0) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_COLLECTION, argumentName);
      throw Error(errorMessage);
    }
  }

  public static emptyString(str: string, argumentName: string): void {
    if (str === '') {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_STRING, argumentName);
      throw Error(errorMessage);
    }
  }

  public static minNumber(number: number, minValue: number, argumentName: string): void {
    if (number < minValue) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentName);
      throw Error(errorMessage);
    }
  }

  public static nullOrUndefinied(data: any, argumentName: string): void {
    if (data === null || data === undefined) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NULL_OR_UNDEFINED, argumentName);
      throw Error(errorMessage);
    }
  }

  public static pageArguments(args: PageArguments, argumentName: string): void {
    DataValidator.nullOrUndefinied(args, argumentName);
    DataValidator.emptyString(args.pageToken, argumentName);

    const maxResultsArgumentName = StringUtilities.nameof<PageArguments>('maxResults');
    DataValidator.minNumber(args.maxResults, 0, maxResultsArgumentName);
  }

  public static validateCollection(collection: any[], argumentName: string): void {
    this.nullOrUndefinied(collection, argumentName);
    this.emptyCollection(collection, argumentName);
  }

  public static validateIndex(index: number, collection: any[], indexArgumentName: string): void {
    if (index < 0 || index >= collection.length) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.INDEX_OUT_OF_RANGE, indexArgumentName);
      throw new Error(exceptionMessage);
    }
  }

  private static appendArgumentName(errorMessage: string, argumentName: string): string {
    return errorMessage + ` Argument name: ${argumentName}`;
  }
}

import { ExceptionConstants } from '../Constants/exception-constants';
import { PageArguments } from '../arguments/page-arguments';
import { StringUtilities } from '../utilities/string-utilities';

export class DataValidator {

  public static EmptyCollection<T>(collection: T[], argumentName: string): void {
    if (collection.length === 0) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_COLLECTION, argumentName);
      throw Error(errorMessage);
    }
  }

  public static EmptyString(str: string, argumentName: string): void {
    if (str === '') {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_STRING, argumentName);
      throw Error(errorMessage);
    }
  }

  public static MinNumber(number: number, minValue: number, argumentName: string): void {
    if (number < minValue) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentName);
      throw Error(errorMessage);
    }
  }

  public static NullOrUndefinied(data: any, argumentName: string): void {
    if (data === null || data === undefined) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NULL_OR_UNDEFINED, argumentName);
      throw Error(errorMessage);
    }
  }

  public static ValidatePageArguments(args: PageArguments, argumentName: string): void {
    DataValidator.NullOrUndefinied(args, argumentName);
    DataValidator.EmptyString(args.pageToken, argumentName);

    const maxResultsArgumentName = StringUtilities.nameof<PageArguments>('maxResults');
    DataValidator.MinNumber(args.maxResults, 0, maxResultsArgumentName);
  }

  private static appendArgumentName(errorMessage: string, argumentName: string): string {
    return errorMessage + ` Argument name: ${argumentName}`;
  }
}

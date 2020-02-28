import { ExceptionConstants } from '../Constants/exception-constants';
import { PageArguments } from '../arguments/page-arguments';
import { StringUtilities } from '../utilities/string-utilities';

export class DataValidator {

  public static EmptyCollection<T>(collection: T[], argumentName: string): void {
    if (collection.length === 0) {
      const errorMessage = ExceptionConstants.EMPTY_COLLECTION + ` Argument name: ${argumentName}`;
      throw Error(errorMessage);
    }
  }

  public static MinNumber(number: number, minValue: number, argumentName: string): void {
    if (number < minValue) {
      const errorMessage = ExceptionConstants.NEGATIVE_NUMBER + ` Argument name: ${argumentName}`;
      throw Error(errorMessage);
    }
  }

  public static NullOrUndefinied(data: any, argumentName: string): void {
    if (!data) {
      const errorMessage = ExceptionConstants.NULL_OR_UNDEFINED + ` Argument name: ${argumentName}`;
      throw Error(errorMessage);
    }
  }

  public static ValidatePageArguments(args: PageArguments, argumentName: string): void {
    DataValidator.NullOrUndefinied(args, argumentName);

    const maxResultsArgumentName = StringUtilities.nameof<PageArguments>('maxResults');
    DataValidator.MinNumber(args.maxResults, 0, maxResultsArgumentName);
  }
}

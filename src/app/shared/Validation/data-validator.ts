import { ExceptionConstants } from '../Constants/exception-constants';

export class DataValidator {

  public static anyNotNullOrUndefined(obj: object, argumentName: string): void {
    const values = Object.values(obj);
    const firstNotNullOrUndefinedValue = values.find(v => v !== null && v !== undefined);
    if (firstNotNullOrUndefinedValue === null || firstNotNullOrUndefinedValue === undefined) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.INVALID_ARGUMENT, argumentName);
      throw Error(exceptionMessage);
    }
  }

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

  public static maxNumber(number: number, maxNumber: number, argumentName: string): void {
    if (number > maxNumber) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.EXCEEDED_MAX_VALUE, argumentName);
      throw Error(exceptionMessage);
    }
  }

  public static minNumber(number: number, minNumber: number, argumentName: string): void {
    if (number < minNumber) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentName);
      throw Error(errorMessage);
    }
  }

  public static notANumber(numberStr: string, argumentName: string): void {
    if (Number.isNaN(+numberStr)) {
      const exceptionMessage = this.appendArgumentName(ExceptionConstants.NOT_A_NUMBER, argumentName);
      throw Error(exceptionMessage);
    }
  }

  public static nullOrUndefinied(data: any, argumentName: string): void {
    if (data === null || data === undefined) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NULL_OR_UNDEFINED, argumentName);
      throw Error(errorMessage);
    }
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

  public static validateString(str: string, argumentName: string): void {
    this.nullOrUndefinied(str, argumentName);
    this.emptyString(str, argumentName);
  }

  private static appendArgumentName(errorMessage: string, argumentName: string): string {
    return errorMessage + ` Argument name: ${argumentName}`;
  }
}

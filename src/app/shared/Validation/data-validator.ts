import { ExceptionConstants } from '../Constants/exception-constants';

export class DataValidator {

  public static anyNotNullOrUndefined(obj: object, argumentsInfo: string): void {
    const values = Object.values(obj);
    const firstNotNullOrUndefinedValue = values.find(v => v !== null && v !== undefined);
    if (firstNotNullOrUndefinedValue === null || firstNotNullOrUndefinedValue === undefined) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.INVALID_ARGUMENT, argumentsInfo);
      throw Error(exceptionMessage);
    }
  }

  public static emptyCollection<T>(collection: T[], argumentsInfo: string): void {
    if (collection.length === 0) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_COLLECTION, argumentsInfo);
      throw Error(errorMessage);
    }
  }

  public static emptyString(str: string, argumentsInfo: string): void {
    if (str === '') {
      const errorMessage = this.appendArgumentName(ExceptionConstants.EMPTY_STRING, argumentsInfo);
      throw Error(errorMessage);
    }
  }

  public static maxNumber(number: number, maxNumber: number, argumentsInfo: string): void {
    if (number > maxNumber) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.EXCEEDED_MAX_VALUE, argumentsInfo);
      throw Error(exceptionMessage);
    }
  }

  public static minNumber(number: number, minNumber: number, argumentsInfo: string): void {
    if (number < minNumber) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NEGATIVE_NUMBER, argumentsInfo);
      throw Error(errorMessage);
    }
  }

  public static notANumber(numberStr: string, argumentsInfo: string): void {
    if (Number.isNaN(+numberStr)) {
      const exceptionMessage = this.appendArgumentName(ExceptionConstants.NOT_A_NUMBER, argumentsInfo);
      throw Error(exceptionMessage);
    }
  }

  public static nullOrUndefinied(data: any, argumentsInfo: string): void {
    if (data === null || data === undefined) {
      const errorMessage = this.appendArgumentName(ExceptionConstants.NULL_OR_UNDEFINED, argumentsInfo);
      throw Error(errorMessage);
    }
  }

  public static validateCollection(collection: any[], argumentsInfo: string): void {
    this.nullOrUndefinied(collection, argumentsInfo);
    this.emptyCollection(collection, argumentsInfo);
  }

  public static validateIndex(index: number, collection: any[], indexArgumentName: string): void {
    if (index < 0 || index >= collection.length) {
      const exceptionMessage =
        this.appendArgumentName(ExceptionConstants.INDEX_OUT_OF_RANGE, indexArgumentName);
      throw new Error(exceptionMessage);
    }
  }

  public static validateString(str: string, argumentsInfo: string): void {
    this.nullOrUndefinied(str, argumentsInfo);
    this.emptyString(str, argumentsInfo);
  }

  private static appendArgumentName(errorMessage: string, argumentsInfo: string): string {
    return errorMessage + ` Argument info: ${argumentsInfo}`;
  }
}

import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { MainConstants } from '../shared/Constants/main-constants';
import { DataValidator } from '../shared/Validation/data-validator';
import { ExceptionConstants } from '../shared/Constants/exception-constants';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  getFormattedNumberString(number: number): string {
    if (number === undefined || number === null) {
      return MainConstants.HIDDEN;
    }
    DataValidator.minNumber(number, 0, 'number');

    const thousandsMinLength = 4;
    const milionsMinLength = 7;
    const bilionMinLength = 10;
    const notSupportedMinLength = 13;

    const numberAsString = number.toString();
    const numberLength = numberAsString.length;

    let numberName = '';
    let numberResult = '';

    let integerPartLength = -1;

    if (numberLength >= notSupportedMinLength) {
      throw Error(ExceptionConstants.NOT_SUPPORTED);
    }
    if (numberLength >= bilionMinLength) {
      numberName = 'B';
      integerPartLength = numberLength - bilionMinLength + 1;
    }
    else if (numberLength >= milionsMinLength) {
      numberName = 'M';
      integerPartLength = numberLength - milionsMinLength + 1;
    }
    else if (numberLength >= thousandsMinLength) {
      numberName = 'K';
      integerPartLength = numberLength - thousandsMinLength + 1;
    }
    else if (numberLength >= 1) {
      numberResult = numberAsString;
    }

    if (numberLength >= thousandsMinLength) {
      numberResult = this.getConcisedNumberString(numberAsString, integerPartLength);
    }

    return numberResult + numberName;
  }

  getConcisedNumberString(number: string, integerPartLength: number): string {
    this.validateGetConcisedNumberStringArguments(number, integerPartLength);

    let numberResult: string;

    const integerEndIndex = integerPartLength;
    const integerPart = number.substring(0, integerEndIndex);

    const fractionStartIndex = integerEndIndex;
    const fractionEndIndex = fractionStartIndex + 1;
    const fractionPart = number.substring(fractionStartIndex, fractionEndIndex);

    if (fractionPart === '0' || fractionPart === '') {
      numberResult = integerPart;
    }
    else {
      numberResult = `${integerPart},${fractionPart}`
    }

    return numberResult;
  }

  private validateGetConcisedNumberStringArguments(number: string, integerPartLength: number): void {
    const numberArgumentName = 'number';
    DataValidator.nullOrUndefinied(number, numberArgumentName);
    DataValidator.notANumber(number, numberArgumentName);

    const integerPartLengthArgument = 'integerPartLength';
    DataValidator.nullOrUndefinied(integerPartLength, integerPartLengthArgument);
    const maxNumber = number.length;
    DataValidator.minNumber(integerPartLength, 0, integerPartLengthArgument);
    DataValidator.maxNumber(integerPartLength, maxNumber, integerPartLengthArgument);
  }

  getDateFromNowString(date: Date): string {
    const result = moment(date).fromNow();

    return result;
  }
}

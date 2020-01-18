import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  getConcisedString(string: string, maxLength: number): string {
    if (string.length > maxLength) {
      const conciseDescription = string.slice(0, maxLength) + ' ...';
      return conciseDescription;
    }
  }

  getFormattedNumberString(number: number): string {
    const thousandsMinLength = 4;
    const milionsMinLength = 7;
    const bilionMinLength = 10;

    const numberAsString = number.toString();
    const numberLength = numberAsString.length;

    let numberName = '';
    let numberResult = '';

    let integerPartLength = -1;

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
    let numberResult: string;

    const integerEndIndex = integerPartLength;
    const integerPart = number.substring(0, integerEndIndex);

    const fractionStartIndex = integerPartLength;
    const fractionPart = number.substring(fractionStartIndex, fractionStartIndex + 1);

    if (fractionPart === '0') {
      numberResult = integerPart;
    }
    else {
      numberResult = `${integerPart},${fractionPart}`
    }

    return numberResult;
  }

  getDateFromNowString(date: string): string {
    let result = moment(date).fromNow();

    return result;
  }
}

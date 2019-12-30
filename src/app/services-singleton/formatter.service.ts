import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {

  getConcisedNumberString(number: number): string {
    let numberName = '';
    let numberResult = '';

    const numberAsString = number.toString();
    const numberCountLength = numberAsString.length;
    if (numberCountLength <= 3) {
      numberResult = numberAsString;
    }
    else if (numberCountLength <= 4) {
      numberName = 'K';
    }
    else if (numberCountLength <= 10) {
      numberName = 'M';
    }
    else if (numberCountLength <= 16) {
      numberName = 'B';
    }

    if (numberCountLength > 3) {
      numberResult = `${numberAsString[0]},${numberAsString[1]}`
    }

    return numberResult + numberName;
  }

  getPublishedDateString(date: string): string {
    let result = moment(date).fromNow();

    return result;
  }
}

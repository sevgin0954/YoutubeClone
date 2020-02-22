import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ArrowDisplayButtonService {

  updateLeftButtonDisabledAttribute(leftBtn: ElementRef, isFirstElementHidden: boolean): void {
    if (isFirstElementHidden) {
      leftBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      leftBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }

  updateRightButtonDisabledAttribute(
    rightBtn: ElementRef,
    areThereHiddenElements: boolean,
    elementsLength: number,
    totalElementsLength: number
  ): void {

    if (areThereHiddenElements || elementsLength < totalElementsLength) {
      rightBtn.nativeElement.removeAttribute('disabled');
    }
    else {
      rightBtn.nativeElement.setAttribute('disabled', 'disabled');
    }
  }
}

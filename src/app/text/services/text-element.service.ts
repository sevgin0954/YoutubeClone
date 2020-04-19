import { Injectable } from '@angular/core';

@Injectable()
export class TextElementService {

  checkIsTextOverflowingParent(textElement: Element): boolean {
    return textElement.scrollHeight > textElement.clientHeight;
  }

  checkIfTextCanOverflow(
    textElement: Element,
    isShowingMore: boolean,
    maxDisplayedRows: number
  ): boolean {
    let canOverflow = true;

    const rowsCount = this.countLinesOfText(textElement);
    if (/**isTextOverflowing === false**/ isShowingMore && rowsCount <= maxDisplayedRows) {
      canOverflow = false;
    }

    return canOverflow;
  }

  countLinesOfText(textElement: Element): number {
    const textLineHeightStyle = window.getComputedStyle(textElement).lineHeight;
    const textLineHeight = this.cssValueToNumber(textLineHeightStyle);
    const clientHeight = textElement.clientHeight;
    const rowsCount = clientHeight / textLineHeight;

    return rowsCount;
  }

  private cssValueToNumber(value: string): number {
    const firstNonNumberCharacter = Array.from(value).find(ch => isNaN(+ch) === true);
    const firstNonNumberIndex = value.indexOf(firstNonNumberCharacter);
    const number = +value.substring(0, firstNonNumberIndex);

    return number;
  }

  setHiddenStyles(textElement: Element, maxDisplayedRows: number): void {
    const styleValue =
      `-webkit-line-clamp: ${maxDisplayedRows};` +
      `display: -webkit-box;`;
    textElement.setAttribute('style', styleValue);
  }
}

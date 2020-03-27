import { Component, Input, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-text-reveal',
  templateUrl: './text-reveal.component.html',
  styleUrls: ['./text-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextRevealComponent implements AfterViewChecked {

  @Input() shouldShowButtons: boolean = false;
  @Input() text: string;
  @Input() maxDisplayedRows: number;
  @ViewChild('textElement', { static: false }) textElement: ElementRef;
  isShowingMore: boolean = false;
  isTextOverflowing: boolean = false;
  canTextOverflow: boolean = true;

  constructor(
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngAfterViewChecked(): void {
    if (this.isShowingMore === false) {
      this.setAttributes();
    }
    const isOverflowing = this.checkIsTextOverflowing();
    this.isTextOverflowing = isOverflowing;
    if (isOverflowing === this.isTextOverflowing) {
      this.changeDetectionRef.detectChanges();
    }
  }

  private checkIsTextOverflowing(): boolean {
    const textNativeElement = this.textElement.nativeElement;

    return textNativeElement.scrollHeight > textNativeElement.clientHeight;
  }

  @HostListener('window:resize')
  private onResize(): void {
    this.isShowingMore = false;
    this.canTextOverflow = this.checkIfTextCanOverflow();

    this.changeDetectionRef.markForCheck();
  }

  private checkIfTextCanOverflow(): boolean {
    let canOverflow = true;

    const rowsCount = this.countLinesOfText();
    if (this.isTextOverflowing === false && this.isShowingMore && rowsCount <= this.maxDisplayedRows) {
      canOverflow = false;
    }

    return canOverflow;
  }

  private countLinesOfText(): number {
    const textLineHeightStyle = window.getComputedStyle(this.textElement.nativeElement).lineHeight;
    const textLineHeight = this.cssValueToNumber(textLineHeightStyle);
    const clientHeight = this.textElement.nativeElement.clientHeight;
    const rowsCount = clientHeight / textLineHeight;

    return rowsCount;
  }

  private cssValueToNumber(value: string): number {
    const firstNonNumberCharacter = Array.from(value).find(ch => isNaN(+ch) === true);
    const firstNonNumberIndex = value.indexOf(firstNonNumberCharacter);
    const number = +value.substring(0, firstNonNumberIndex);

    return number;
  }

  showLess(): void {
    this.isShowingMore = false;
    this.setAttributes();
  }

  showMore(): void {
    this.isShowingMore = true;
    this.textElement.nativeElement.removeAttribute('style');
  }

  setAttributes(): void {
    const styleValue =
    `-webkit-line-clamp: ${this.maxDisplayedRows};` +
    `display: -webkit-box;`;
    this.textElement.nativeElement.setAttribute('style', styleValue);
  }
}

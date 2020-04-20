import { Component, Input, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';

import { TextElementService } from '../services/text-element.service';

@Component({
  selector: 'app-text-reveal',
  templateUrl: './text-reveal.component.html',
  styleUrls: ['./text-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextRevealComponent implements AfterViewChecked, OnChanges {

  @Input()
  shouldShowButtons: boolean = false;

  @Input()
  text: string;

  @Input()
  maxDisplayedRows: number;

  @ViewChild('textElement')
  textElement: ElementRef;

  isShowingMore: boolean = false;
  isTextOverflowing: boolean = false;
  canTextOverflow: boolean = true;
  private canTextOverflowPreviousValue: boolean = true;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private textElementService: TextElementService
  ) { }

  ngAfterViewChecked(): void {
    this.updateButtonsFields();
  }

  ngOnChanges(): void {
    if (this.shouldShowButtons === true) {
      this.addResizeListener();
    }
    else if (this.shouldShowButtons === false) {
      this.removeResizeListener();
    }
  }

  private addResizeListener(): void {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private removeResizeListener(): void {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.updateButtonsFields();

    if (this.canTextOverflow !== this.canTextOverflowPreviousValue) {
      this.isShowingMore = false;
    }
    this.canTextOverflowPreviousValue = this.canTextOverflow;

    this.tryDetectChanges();
  }

  updateButtonsFields(): void {
    if (this.isShowingMore === false) {
      this.textElementService
        .setHiddenStyles(this.textElement.nativeElement, this.maxDisplayedRows);
    }

    this.canTextOverflow = this.textElementService
      .checkIfTextCanOverflow(this.textElement.nativeElement, this.isShowingMore, this.maxDisplayedRows);

    const isCurrentlyOverflowing = this.textElementService
      .checkIsTextOverflowingParent(this.textElement.nativeElement);
    if (isCurrentlyOverflowing !== this.isTextOverflowing) {
      this.isTextOverflowing = isCurrentlyOverflowing;

      this.tryDetectChanges();
    }
  }

  private tryDetectChanges(): void {
    if (this.shouldShowButtons) {
      this.changeDetection.detectChanges();
    }
  }

  showLess(): void {
    this.isShowingMore = false;
    this.textElementService
      .setHiddenStyles(this.textElement.nativeElement, this.maxDisplayedRows);
  }

  showMore(): void {
    this.isShowingMore = true;
    this.textElement.nativeElement.removeAttribute('style');
  }
}

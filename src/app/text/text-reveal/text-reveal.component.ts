import { Component, Input, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';

import { TextElementService } from '../services/text-element.service';

@Component({
  selector: 'app-text-reveal',
  templateUrl: './text-reveal.component.html',
  styleUrls: ['./text-reveal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextRevealComponent implements AfterViewChecked, OnChanges {

  @Input() shouldShowButtons: boolean = false;
  @Input() text: string;
  @Input() maxDisplayedRows: number;
  @ViewChild('textElement', { static: false }) textElement: ElementRef;
  isShowingMore: boolean = false;
  isTextOverflowing: boolean = false;
  canTextOverflow: boolean = true;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private textElementService: TextElementService
  ) { }

  ngAfterViewChecked(): void {
    if (this.isShowingMore === false) {
      this.textElementService.setHiddenStyles(this.textElement.nativeElement, this.maxDisplayedRows);
    }

    // Update buttons
    const isCurrentlyOverflowing = this.textElementService
      .checkIsTextOverflowingParent(this.textElement.nativeElement);
    if (isCurrentlyOverflowing !== this.isTextOverflowing) {
      this.isTextOverflowing = isCurrentlyOverflowing;

      // Updates the view and displays or hide the buttons
      this.changeDetectionRef.detectChanges();
    }
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
    window.addEventListener('resize', this.updateButtonsFields.bind(this));
  }

  private removeResizeListener(): void {
    window.removeEventListener('resize', this.updateButtonsFields.bind(this));
  }

  updateButtonsFields(): void {
    this.isShowingMore = false;
    this.canTextOverflow = this.textElementService
      .checkIfTextCanOverflow(this.textElement.nativeElement, this.isShowingMore, this.maxDisplayedRows);
  }

  showLess(): void {
    this.isShowingMore = false;
    this.textElementService.setHiddenStyles(this.textElement.nativeElement, this.maxDisplayedRows);
  }

  showMore(): void {
    this.isShowingMore = true;
    this.textElement.nativeElement.removeAttribute('style');
  }

  onChangeDetection() {
    console.log('change detection text revealchange detection text revealchange detection text revealchange detection text reveal')
  }
}

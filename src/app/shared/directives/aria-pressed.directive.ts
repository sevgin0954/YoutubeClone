import { Directive, ElementRef, Input, HostListener, Renderer2, OnChanges } from '@angular/core';

import isRequired from 'src/app/decorators/isRequired';

@Directive({
  selector: '[appAriaPressed]'
})
export class AriaPressedDirective implements OnChanges {

  @isRequired
  @Input()
  appAriaPressed: boolean;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.updateAttributeValue();
  }

  ngOnChanges(): void {
    this.updateAttributeValue();
  }

  updateAttributeValue(): void {
    this.renderer
      .setAttribute(this.elRef.nativeElement, 'aria-pressed', `${this.appAriaPressed}`);
  }

  @HostListener('click')
  changeValue(): void {
    this.appAriaPressed = !this.appAriaPressed;
    this.updateAttributeValue();
  }

}

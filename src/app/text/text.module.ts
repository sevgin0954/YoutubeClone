import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRevealComponent } from './text-reveal/text-reveal.component';

@NgModule({
  declarations: [
    TextRevealComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextRevealComponent
  ]
})
export class TextModule { }

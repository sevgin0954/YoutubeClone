import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextRevealComponent } from './text-reveal/text-reveal.component';
import { TextElementService } from './services/text-element.service';

@NgModule({
  declarations: [
    TextRevealComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TextElementService
  ],
  exports: [
    TextRevealComponent
  ]
})
export class TextModule { }

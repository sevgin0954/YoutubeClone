import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-reveal',
  templateUrl: './text-reveal.component.html',
  styleUrls: ['./text-reveal.component.scss']
})
export class TextRevealComponent implements OnInit {

  @Input() text: string;
  @Input() maxDisplayedCharacters: number;
  shouldShowButtons: boolean;

  isTextShown: boolean = false;
  displayedText: string;
  hiddenText: string;

  ngOnInit(): void {
    this.displayedText = this.text.slice(0, this.maxDisplayedCharacters);
    this.hiddenText = this.text.slice(this.maxDisplayedCharacters);
    this.shouldShowButtons = this.text.length > this.maxDisplayedCharacters;
  }
}

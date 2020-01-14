import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRevealComponent } from './text-reveal.component';

describe('TextRevealComponent', () => {
  let component: TextRevealComponent;
  let fixture: ComponentFixture<TextRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

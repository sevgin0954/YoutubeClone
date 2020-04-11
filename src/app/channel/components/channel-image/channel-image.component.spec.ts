import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelImageComponent } from './channel-image.component';

describe('ChannelImageComponent', () => {
  let component: ChannelImageComponent;
  let fixture: ComponentFixture<ChannelImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

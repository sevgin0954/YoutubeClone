import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSubscribeButtonComponent } from './channel-subscribe-button.component';

describe('ChannelSubscribeButtonComponent', () => {
  let component: ChannelSubscribeButtonComponent;
  let fixture: ComponentFixture<ChannelSubscribeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSubscribeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSubscribeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

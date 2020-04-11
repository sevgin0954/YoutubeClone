import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSubscribersInfoComponent } from './channel-subscribers-info.component';

describe('ChannelSubscribersInfoComponent', () => {
  let component: ChannelSubscribersInfoComponent;
  let fixture: ComponentFixture<ChannelSubscribersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSubscribersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSubscribersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

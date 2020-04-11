import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelBannerComponent } from './channel-banner.component';

describe('ChannelBannerComponent', () => {
  let component: ChannelBannerComponent;
  let fixture: ComponentFixture<ChannelBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

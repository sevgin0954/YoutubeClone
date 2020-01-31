import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelMiniComponent } from './channel-mini.component';

describe('ChannelMiniComponent', () => {
  let component: ChannelMiniComponent;
  let fixture: ComponentFixture<ChannelMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

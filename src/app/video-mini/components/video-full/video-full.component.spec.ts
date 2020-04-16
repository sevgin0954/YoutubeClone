import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFullComponent } from './video-full.component';

describe('VideoFullComponent', () => {
  let component: VideoFullComponent;
  let fixture: ComponentFixture<VideoFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

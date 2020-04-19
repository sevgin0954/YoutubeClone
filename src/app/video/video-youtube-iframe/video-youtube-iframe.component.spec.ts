import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoYoutubeIframeComponent } from './video-youtube-iframe.component';

describe('VideoYoutubeIframeComponent', () => {
  let component: VideoYoutubeIframeComponent;
  let fixture: ComponentFixture<VideoYoutubeIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoYoutubeIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoYoutubeIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

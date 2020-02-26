import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHeaderComponent } from './video-header.component';

describe('VideoHeaderComponent', () => {
  let component: VideoHeaderComponent;
  let fixture: ComponentFixture<VideoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

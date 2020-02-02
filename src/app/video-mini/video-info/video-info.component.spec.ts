import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoComponent } from './video-info.component';

describe('VideoInfoComponent', () => {
  let component: VideoInfoComponent;
  let fixture: ComponentFixture<VideoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

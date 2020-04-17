import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistInfoComponent } from './playlist-info.component';

describe('PlaylistInfoComponent', () => {
  let component: PlaylistInfoComponent;
  let fixture: ComponentFixture<PlaylistInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

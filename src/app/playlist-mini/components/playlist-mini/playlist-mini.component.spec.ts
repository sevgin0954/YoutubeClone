import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistMiniComponent } from './playlist-mini.component';

describe('PlaylistMiniComponent', () => {
  let component: PlaylistMiniComponent;
  let fixture: ComponentFixture<PlaylistMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

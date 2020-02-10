import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistButtonsComponent } from './playlist-buttons.component';

describe('PlaylistButtonsComponent', () => {
  let component: PlaylistButtonsComponent;
  let fixture: ComponentFixture<PlaylistButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

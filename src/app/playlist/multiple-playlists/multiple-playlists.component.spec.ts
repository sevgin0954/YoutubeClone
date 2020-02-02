import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePlaylistsComponent } from './multiple-playlists.component';

describe('MultiplePlaylistsComponent', () => {
  let component: MultiplePlaylistsComponent;
  let fixture: ComponentFixture<MultiplePlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

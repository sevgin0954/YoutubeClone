import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplePlaylistsTemplateComponent } from './multiple-playlists-template.component';

describe('MultiplePlaylistsTemplateComponent', () => {
  let component: MultiplePlaylistsTemplateComponent;
  let fixture: ComponentFixture<MultiplePlaylistsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePlaylistsTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplePlaylistsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

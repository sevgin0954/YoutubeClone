import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChannelsPlaylistComponent } from './multiple-channels-playlist.component';

describe('MultipleChannelsPlaylistComponent', () => {
  let component: MultipleChannelsPlaylistComponent;
  let fixture: ComponentFixture<MultipleChannelsPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChannelsPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChannelsPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

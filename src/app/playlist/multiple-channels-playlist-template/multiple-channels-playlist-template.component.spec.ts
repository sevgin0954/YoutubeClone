import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChannelsPlaylistTemplateComponent } from './multiple-channels-playlist-template.component';

describe('MultipleChannelsPlaylistTemplateComponent', () => {
  let component: MultipleChannelsPlaylistTemplateComponent;
  let fixture: ComponentFixture<MultipleChannelsPlaylistTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChannelsPlaylistTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChannelsPlaylistTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

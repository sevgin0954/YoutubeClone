import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePlaylistTemplateComponent } from './single-playlist-template.component';

describe('SinglePlaylistTemplateComponent', () => {
  let component: SinglePlaylistTemplateComponent;
  let fixture: ComponentFixture<SinglePlaylistTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglePlaylistTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglePlaylistTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

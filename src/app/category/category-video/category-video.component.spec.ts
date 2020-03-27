import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryVideoComponent } from './category-video.component';

describe('CategoryVideoComponent', () => {
  let component: CategoryVideoComponent;
  let fixture: ComponentFixture<CategoryVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

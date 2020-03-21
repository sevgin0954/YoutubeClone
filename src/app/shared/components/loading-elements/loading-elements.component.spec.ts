import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingElementsComponent } from './loading-elements.component';

describe('LoadingElementsComponent', () => {
  let component: LoadingElementsComponent;
  let fixture: ComponentFixture<LoadingElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

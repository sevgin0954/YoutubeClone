import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetHeaderComponent } from './offset-header.component';

describe('OffsetHeaderComponent', () => {
  let component: OffsetHeaderComponent;
  let fixture: ComponentFixture<OffsetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffsetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffsetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

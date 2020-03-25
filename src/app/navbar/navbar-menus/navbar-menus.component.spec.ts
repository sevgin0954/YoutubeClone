import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMenusComponent } from './navbar-menus.component';

describe('NavbarMenusComponent', () => {
  let component: NavbarMenusComponent;
  let fixture: ComponentFixture<NavbarMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

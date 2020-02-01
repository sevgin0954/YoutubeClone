import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSectionsComponent } from './channel-sections.component';

describe('ChannelSectionsComponent', () => {
  let component: ChannelSectionsComponent;
  let fixture: ComponentFixture<ChannelSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
